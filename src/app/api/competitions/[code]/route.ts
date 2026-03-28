import {
  FootballDataMissingTokenError,
  footballDataGet,
} from "@/lib/football-data/client";
import type { CompetitionDto } from "@/lib/football-data/types";

const CODE_RE = /^[A-Za-z0-9_-]{1,32}$/;

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
    upstream = await footballDataGet(`/competitions/${encodeURIComponent(code)}`);
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

  let parsed: unknown;
  try {
    parsed = JSON.parse(bodyText) as Record<string, unknown>;
  } catch {
    return Response.json(
      { error: { message: "Invalid JSON from provider", code: "PARSE_ERROR" } },
      { status: 502 }
    );
  }

  const o = parsed as {
    id?: unknown;
    name?: unknown;
    code?: unknown;
    type?: unknown;
    emblem?: unknown;
  };
  if (
    typeof o.id !== "number" ||
    typeof o.name !== "string" ||
    typeof o.type !== "string"
  ) {
    return Response.json(
      { error: { message: "Unexpected competition shape", code: "PARSE_ERROR" } },
      { status: 502 }
    );
  }

  const payload = mapCompetition({
    id: o.id,
    name: o.name,
    code: typeof o.code === "string" ? o.code : null,
    type: o.type,
    emblem: typeof o.emblem === "string" ? o.emblem : null,
  });

  return Response.json(payload);
}
