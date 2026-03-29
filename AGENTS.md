<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Matchday — stack and layout

**Application**

- **Next.js** 16.x, **App Router** under `src/app/` (route groups such as `(site)` where used).
- **React** 19.x, **TypeScript** 5.x (`strict`, `jsx: react-jsx`, path alias `@/*` → `./src/*`).

**UI and client state**

- **Tailwind CSS** v4 with `@tailwindcss/postcss`.
- **Redux Toolkit** and **react-redux** for client-side state where the app uses a store.
- **Recharts** for chart components.

**Data**

- **PostgreSQL** with **Prisma** 6.x (`prisma/schema.prisma`, generated client). Persisted domain today includes favorite competitions (`FavoriteCompetition`); live match and competition payloads are fetched from **football-data.org REST API v4** on the server, not stored as a separate cache layer unless the codebase is extended that way.
- Server integration lives in `src/lib/football-data/` (`client.ts`, shared `types`). **Route Handlers** under `src/app/api/` call that client; the browser should only call same-origin `/api/...` so the API token stays server-side.

**Tooling and deploy**

- **ESLint** 9 with **eslint-config-next**.
- **dotenv-cli** wraps Prisma CLI commands so `npm run db:*` can load `.env.local`.
- **Vercel-style build**: `vercel-build` runs `prisma migrate deploy`, `prisma generate`, then `next build`. Prisma `binaryTargets` include `rhel-openssl-3.0.x` for typical Linux serverless hosts.

**Documentation**

- Keep **project documentation** (e.g. `README.md`) in **English** unless the user explicitly asks for another file or language.
