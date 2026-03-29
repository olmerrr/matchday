# Matchday

Web app for football: matches, tables, top scorers, charts.

Your favorite leagues are saved in Postgres. Live scores and league data come from football-data.org when you use the app. They are not copied into the database as a separate cache.

## Quick start

- Copy `.env.example` to `.env.local`.
- Add the values described in **Environment variables** below.
- Run:

```bash
npm install
npm run db:migrate
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000).

If something is missing:

- No `FOOTBALL_DATA_API_TOKEN` → match and league APIs return 503.
- No `DATABASE_URL` → migrations and favorites do not work.

## Environment variables

Put these in `.env.local`. Do not commit real keys or passwords.

**`FOOTBALL_DATA_API_TOKEN`** (you need this)

Register and copy a key: [football-data.org](https://www.football-data.org/client/register). The app uses it only on the server (`src/app/api`), not in the browser.

**`DATABASE_URL`** (you need this)

Postgres URL for Prisma. Used for favorites and for running migrations.

**`FOOTBALL_DATA_MATCH_MAX_DAYS`** (optional)

How many days of fixtures to request. Default is 10. Maximum is 366.

## What talks to what

- Matches, competitions, standings, scorers: loaded from football-data.org through your own `/api/...` routes. The browser never sees the football-data token.
- Favorite leagues: read and written in Postgres with Prisma.

## npm scripts

- `npm run dev` — local dev server
- `npm run dev:webpack` — same, Webpack instead of Turbopack if you need it
- `npm run build` — production build
- `npm run vercel-build` — migrations, `prisma generate`, then `next build` (for Vercel)
- `npm run db:migrate` — run migrations locally (uses `.env.local`)
- `npm run db:deploy` — apply migrations (e.g. production)
- `npm run lint` — ESLint

## Deploy on Vercel

- Connect the GitHub repo. Vercel usually detects Next.js by itself.
- Add a Postgres database and set `DATABASE_URL` in the project env vars (Production; add the same for **Preview** if you want preview deployments to hit a real DB).
- Set `FOOTBALL_DATA_API_TOKEN`. Add `FOOTBALL_DATA_MATCH_MAX_DAYS` only if you want to change the default.
- Deploy. This repo includes **`vercel.json`** with `buildCommand: npm run vercel-build` (runs `prisma migrate deploy`, then build). If you ever remove that file, set **Build Command** to `npm run vercel-build` in the Vercel project settings.

### New Vercel project (e.g. after deleting the old one)

Vercel does not bring back a removed project. Create a **new** project from the same Git repository.

- **Env vars do not copy over** — enter `DATABASE_URL` and `FOOTBALL_DATA_API_TOKEN` again (and optional vars) for each environment you use.
- **Postgres** — the old database integration is tied to the old project. Create a new Vercel Postgres (or point `DATABASE_URL` at another Postgres instance you control).
- **First successful deploy** runs migrations against whatever `DATABASE_URL` you set.
- **Custom domains** — add them again under the new project’s Domains settings.

The free football-data.org plan has request limits. Under heavy load you may see HTTP 429.
