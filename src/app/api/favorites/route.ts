import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

const CODE_RE = /^[A-Za-z0-9_-]{1,32}$/;

export async function GET() {
  try {
    const favorites = await prisma.favoriteCompetition.findMany({
      orderBy: { createdAt: "desc" },
    });
    return Response.json({ favorites });
  } catch {
    return Response.json(
      { error: { message: "Database unavailable", code: "DB_ERROR" } },
      { status: 503 }
    );
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: { message: "Invalid JSON", code: "BAD_REQUEST" } },
      { status: 400 }
    );
  }

  const o = body as { code?: unknown; name?: unknown };
  const code = typeof o.code === "string" ? o.code.trim() : "";
  if (!CODE_RE.test(code)) {
    return Response.json(
      { error: { message: "Invalid league code", code: "BAD_REQUEST" } },
      { status: 400 }
    );
  }

  const name =
    typeof o.name === "string" && o.name.trim() ? o.name.trim() : null;

  try {
    const existing = await prisma.favoriteCompetition.findUnique({
      where: { code },
    });
    if (existing) {
      if (name != null) {
        const row = await prisma.favoriteCompetition.update({
          where: { code },
          data: { name },
        });
        return Response.json(row);
      }
      return Response.json(existing);
    }
    const row = await prisma.favoriteCompetition.create({
      data: { code, name },
    });
    return Response.json(row, { status: 201 });
  } catch {
    return Response.json(
      { error: { message: "Database unavailable", code: "DB_ERROR" } },
      { status: 503 }
    );
  }
}
