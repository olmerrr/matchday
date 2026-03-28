# Matchday

Web app for football fixtures, results, league tables, top scorers, and standings charts. Users can save favorite leagues (PostgreSQL).

**Goals:** fast match overview; explore leagues and stats; hide football-data.org credentials behind `/api` routes; persist favorites in a database.

## Tech stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Redux Toolkit + RTK Query, Recharts, Prisma + PostgreSQL, football-data.org API v4 (server-side via `FOOTBALL_DATA_API_TOKEN`).

## Setup

`.env.local`:

```bash
FOOTBALL_DATA_API_TOKEN=your_token_here
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

Optional: `FOOTBALL_DATA_MATCH_MAX_DAYS` (default `10`, max `366`) — limits the date span sent to the matches API.

```bash
npm install
npm run dev
```

For favorites, run `npm run db:migrate` once with a valid `DATABASE_URL`. App: [http://localhost:3000](http://localhost:3000).

Other commands (`build`, `db:deploy`, `lint`, …) are in `package.json` scripts.

## Deploy (Vercel + GitHub)

1. Push the repo to GitHub (same account you already use with Vercel).
2. In Vercel: **Add New… → Project → Import** the `matchday` repository. Framework: Next.js (auto). The repo includes `vercel.json`, so the build runs `npm run vercel-build` (`prisma migrate deploy` + `prisma generate` + `next build`).
3. **PostgreSQL:** add a database (e.g. [Vercel Postgres](https://vercel.com/storage/postgres), [Neon](https://neon.tech), or Supabase). Copy the connection string (often `postgresql://…` with `?sslmode=require`).
4. **Environment variables** in the project **Settings → Environment Variables** (Production + Preview if you want previews to work with DB):
   - `FOOTBALL_DATA_API_TOKEN` — from [football-data.org](https://www.football-data.org/client/register)
   - `DATABASE_URL` — your Postgres URL  
   Optional: `FOOTBALL_DATA_MATCH_MAX_DAYS`
5. **Deploy.** First successful build applies migrations and starts the app. Without `DATABASE_URL`, the build fails on purpose (migrations need a DB). Without the football token, match/league API routes return 503.

**Hobby plan** is enough for a small app; watch football-data.org rate limits on the free API tier.

If you ever remove `vercel.json`, set **Build Command** manually to `npm run vercel-build` and keep the env vars as above.
