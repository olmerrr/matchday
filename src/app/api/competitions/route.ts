import { NextRequest } from "next/server";
import {
  FootballDataMissingTokenError,
  footballDataGet,
} from "@/lib/football-data/client";
import type {
  CompetitionDto,
  CompetitionsApiResponse,
  FootballDataCompetitionsListRaw,
} from "@/lib/football-data/types";

function mapCompetition(raw: {
  id: number;
  name: string;
  code: string | null;
  type: string;
  emblem: string | null;
}): CompetitionDto {
  return {
    id: raw.id,
    name: raw.name,
    code: raw.code,
    type: raw.type,
    emblem: raw.emblem,
  };
}

export async function GET(request: NextRequest) {
  const allowedKeys = new Set(["areas", "plan"]);
  const forward = new URLSearchParams();
  request.nextUrl.searchParams.forEach((value, key) => {
    if (allowedKeys.has(key)) {
      forward.set(key, value);
    }
  });

  let upstream: Response;
  try {
    upstream = await footballDataGet("/competitions", forward);
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

  let parsed: FootballDataCompetitionsListRaw;
  try {
    parsed = JSON.parse(bodyText) as FootballDataCompetitionsListRaw;
  } catch {
    return Response.json(
      { error: { message: "Invalid JSON from provider", code: "PARSE_ERROR" } },
      { status: 502 }
    );
  }

  const list = parsed.competitions ?? [];
  const payload: CompetitionsApiResponse = {
    count: parsed.count ?? list.length,
    competitions: list.map(mapCompetition),
  };

  return Response.json(payload);
}
