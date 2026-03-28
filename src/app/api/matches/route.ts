import { NextRequest } from "next/server";
import {
  FootballDataMissingTokenError,
  footballDataGet,
} from "@/lib/football-data/client";
import type { MatchDto, MatchesApiResponse } from "@/lib/football-data/types";

function padDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function maxMatchDateSpanDays(): number {
  const raw = process.env.FOOTBALL_DATA_MATCH_MAX_DAYS;
  if (raw == null || raw === "") {
    return 10;
  }
  const n = parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 1) {
    return 10;
  }
  return Math.min(n, 366);
}

function utcDayStart(isoDate: string): Date {
  return new Date(`${isoDate}T00:00:00.000Z`);
}

function clampDateRangeToMaxSpan(
  dateFrom: string,
  dateTo: string,
  maxSpanDays: number
): { dateFrom: string; dateTo: string } {
  let from = utcDayStart(dateFrom);
  let to = utcDayStart(dateTo);
  if (to.getTime() < from.getTime()) {
    to = new Date(from);
  }
  const spanDays = Math.round((to.getTime() - from.getTime()) / 86400000);
  if (spanDays <= maxSpanDays) {
    return { dateFrom, dateTo };
  }
  const clampedTo = new Date(from.getTime() + maxSpanDays * 86400000);
  return { dateFrom: padDate(from), dateTo: padDate(clampedTo) };
}

function defaultDateRange(maxSpan: number) {
  const back = Math.min(3, Math.max(0, maxSpan - 1));
  const from = new Date();
  from.setUTCDate(from.getUTCDate() - back);
  const to = new Date(from);
  to.setUTCDate(to.getUTCDate() + maxSpan);
  return clampDateRangeToMaxSpan(padDate(from), padDate(to), maxSpan);
}

function parseUpstreamErrorMessage(text: string): string {
  const t = text.trim();
  if (!t) {
    return "";
  }
  try {
    const o = JSON.parse(t) as { message?: string };
    if (typeof o.message === "string" && o.message.length > 0) {
      return o.message;
    }
  } catch {
    return t;
  }
  return t;
}

const ID_LIST_RE = /^[\d,]+$/;

function mapTeam(raw: {
  name?: string;
  shortName?: string;
  crest?: string | null;
}): MatchDto["homeTeam"] {
  const name = typeof raw.name === "string" ? raw.name : "—";
  return {
    name,
    shortName: typeof raw.shortName === "string" ? raw.shortName : null,
    crest: typeof raw.crest === "string" ? raw.crest : null,
  };
}

export async function GET(request: NextRequest) {
  const forward = new URLSearchParams();
  const src = request.nextUrl.searchParams;

  const comp = src.get("competitions");
  const hasCompetitionFilter = Boolean(comp && ID_LIST_RE.test(comp));
  if (hasCompetitionFilter && comp) {
    forward.set("competitions", comp);
  }

  const status = src.get("status");
  if (status && /^[A-Z_]+$/.test(status)) {
    forward.set("status", status);
  }

  const maxSpan = maxMatchDateSpanDays();

  let dateFrom = src.get("dateFrom");
  let dateTo = src.get("dateTo");
  const def = defaultDateRange(maxSpan);
  if (!dateFrom || !/^\d{4}-\d{2}-\d{2}$/.test(dateFrom)) {
    dateFrom = def.dateFrom;
  }
  if (!dateTo || !/^\d{4}-\d{2}-\d{2}$/.test(dateTo)) {
    dateTo = def.dateTo;
  }
  const clamped = clampDateRangeToMaxSpan(dateFrom, dateTo, maxSpan);
  dateFrom = clamped.dateFrom;
  dateTo = clamped.dateTo;
  forward.set("dateFrom", dateFrom);
  forward.set("dateTo", dateTo);

  let upstream: Response;
  try {
    upstream = await footballDataGet("/matches", forward);
  } catch (err) {
    if (err instanceof FootballDataMissingTokenError) {
      return Response.json(
        { error: { message: err.message, code: "MISSING_TOKEN" } },
        { status: 503 }
      );
    }
    const aborted =
      err instanceof Error &&
      (err.name === "AbortError" || err.name === "TimeoutError");
    if (aborted) {
      return Response.json(
        {
          error: {
            message: "football-data request timed out",
            code: "UPSTREAM_TIMEOUT",
          },
        },
        { status: 504 }
      );
    }
    throw err;
  }

  const bodyText = await upstream.text();
  if (!upstream.ok) {
    const st = upstream.status;
    const passClient =
      st === 400 || st === 403 || st === 404 || st === 429;
    const message =
      parseUpstreamErrorMessage(bodyText) || upstream.statusText;
    return Response.json(
      {
        error: {
          message,
          code: "UPSTREAM_ERROR",
          status: st,
        },
      },
      { status: passClient ? st : 502 }
    );
  }

  let parsed: {
    matches?: Array<{
      id?: number;
      utcDate?: string;
      status?: string;
      matchday?: number | null;
      homeTeam?: { name?: string; shortName?: string; crest?: string | null };
      awayTeam?: { name?: string; shortName?: string; crest?: string | null };
      competition?: {
        name?: string;
        code?: string | null;
      };
    }>;
  };
  try {
    parsed = JSON.parse(bodyText) as typeof parsed;
  } catch {
    return Response.json(
      { error: { message: "Invalid JSON from provider", code: "PARSE_ERROR" } },
      { status: 502 }
    );
  }

  const rawList = parsed.matches ?? [];
  const matches: MatchDto[] = rawList
    .map((m): MatchDto | null => {
      if (typeof m.id !== "number" || typeof m.utcDate !== "string") {
        return null;
      }
      const ht = m.homeTeam ?? {};
      const at = m.awayTeam ?? {};
      const comp = m.competition ?? {};
      return {
        id: m.id,
        utcDate: m.utcDate,
        status: typeof m.status === "string" ? m.status : "UNKNOWN",
        matchday: typeof m.matchday === "number" ? m.matchday : null,
        homeTeam: mapTeam(ht),
        awayTeam: mapTeam(at),
        competitionName:
          typeof comp.name === "string" ? comp.name : "Competition",
        competitionCode:
          typeof comp.code === "string" ? comp.code : null,
      };
    })
    .filter((m): m is MatchDto => m !== null)
    .sort((a, b) => a.utcDate.localeCompare(b.utcDate));

  const payload: MatchesApiResponse = {
    count: matches.length,
    matches,
  };

  return Response.json(payload);
}
