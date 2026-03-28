import { prisma } from "@/lib/prisma";

const CODE_RE = /^[A-Za-z0-9_-]{1,32}$/;

export async function DELETE(
  _request: Request,
  ctx: { params: Promise<{ code: string }> }
) {
  const { code: raw } = await ctx.params;
  const code = decodeURIComponent(raw);
  if (!CODE_RE.test(code)) {
    return Response.json(
      { error: { message: "Invalid league code", code: "BAD_REQUEST" } },
      { status: 400 }
    );
  }

  try {
    await prisma.favoriteCompetition.deleteMany({ where: { code } });
    return new Response(null, { status: 204 });
  } catch {
    return Response.json(
      { error: { message: "Database unavailable", code: "DB_ERROR" } },
      { status: 503 }
    );
  }
}
