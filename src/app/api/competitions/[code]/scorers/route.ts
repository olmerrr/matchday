import {
  FootballDataMissingTokenError,
  footballDataGet,
} from "@/lib/football-data/client";
import type { ScorerRowDto, ScorersApiResponse } from "@/lib/football-data/types";

const CODE_RE = /^[A-Za-z0-9_-]{1,32}$/;

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

  const forward = new URLSearchParams();
  forward.set("limit", "15");

  let upstream: Response;
  try {
    upstream = await footballDataGet(
      `/competitions/${encodeURIComponent(code)}/scorers`,
      forward
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

  let parsed: {
    scorers?: Array<{
      player?: { name?: string };
      team?: { name?: string; crest?: string | null };
      goals?: number;
      assists?: number | null;
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

  const list = parsed.scorers ?? [];
  const scorers: ScorerRowDto[] = list
    .map((s): ScorerRowDto | null => {
      const name = s.player?.name;
      const team = s.team?.name;
      if (typeof name !== "string" || typeof team !== "string") {
        return null;
      }
      const goals = s.goals;
      if (typeof goals !== "number") {
        return null;
      }
      return {
        playerName: name,
        teamName: team,
        teamCrest:
          typeof s.team?.crest === "string" ? s.team.crest : null,
        goals,
        assists: typeof s.assists === "number" ? s.assists : null,
      };
    })
    .filter((s): s is ScorerRowDto => s !== null);

  const payload: ScorersApiResponse = {
    competitionCode: code,
    scorers,
  };

  return Response.json(payload);
}
