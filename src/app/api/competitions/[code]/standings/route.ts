import {
  FootballDataMissingTokenError,
  footballDataGet,
} from "@/lib/football-data/client";
import type { StandingRowDto, StandingsApiResponse } from "@/lib/football-data/types";

const CODE_RE = /^[A-Za-z0-9_-]{1,32}$/;

type RawTableRow = {
  position?: number;
  team?: { name?: string; crest?: string | null };
  playedGames?: number;
  won?: number;
  draw?: number;
  lost?: number;
  points?: number;
  goalsFor?: number;
  goalsAgainst?: number;
};

type RawStanding = {
  type?: string;
  table?: RawTableRow[];
};

export async function GET(
  _request: Request,
  ctx: { params: Promise<{ code: string }> }
) {
  const { code: rawCode } = await ctx.params;
  const code = decodeURIComponent(rawCode);
  if (!CODE_RE.test(code)) {
    return Response.json(
      { error: { message: "Invalid competition code", code: "BAD_REQUEST" } },
      { status: 400 }
    );
  }

  let upstream: Response;
  try {
    upstream = await footballDataGet(
      `/competitions/${encodeURIComponent(code)}/standings`
    );
  } catch (err) {
    if (err instanceof FootballDataMissingTokenError) {
      return Response.json(
        { error: { message: err.message, code: "MISSING_TOKEN" } },
        { status: 503 }
      );
    }
    throw err;
  }

  const bodyText = await upstream.text();
  if (upstream.status === 404) {
    return Response.json(
      {
        error: {
          message: bodyText || "Not found",
          code: "NOT_FOUND",
          status: 404,
        },
      },
      { status: 404 }
    );
  }
  if (!upstream.ok) {
    return Response.json(
      {
        error: {
          message: bodyText || upstream.statusText,
          code: "UPSTREAM_ERROR",
          status: upstream.status,
        },
      },
      { status: 502 }
    );
  }

  let parsed: { standings?: RawStanding[] };
  try {
    parsed = JSON.parse(bodyText) as { standings?: RawStanding[] };
  } catch {
    return Response.json(
      { error: { message: "Invalid JSON from provider", code: "PARSE_ERROR" } },
      { status: 502 }
    );
  }

  const blocks = parsed.standings ?? [];
  const total =
    blocks.find((s) => s.type === "TOTAL") ?? blocks[0];
  const table = total?.table ?? [];

  const rows: StandingRowDto[] = table
    .map((row): StandingRowDto | null => {
      const name = row.team?.name;
      if (
        typeof row.position !== "number" ||
        typeof name !== "string" ||
        typeof row.points !== "number"
      ) {
        return null;
      }
      return {
        position: row.position,
        name,
        played: row.playedGames ?? 0,
        won: row.won ?? 0,
        draw: row.draw ?? 0,
        lost: row.lost ?? 0,
        points: row.points,
        goalsFor: row.goalsFor ?? 0,
        goalsAgainst: row.goalsAgainst ?? 0,
        crest:
          typeof row.team?.crest === "string" ? row.team.crest : null,
      };
    })
    .filter((r): r is StandingRowDto => r !== null)
    .sort((a, b) => a.position - b.position);

  const payload: StandingsApiResponse = {
    competitionCode: code,
    rows,
  };

  return Response.json(payload);
}
