"use client";

import Link from "next/link";
import {
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from "@/store/footballApi";

export function FavoritesClient() {
  const { data, error, isLoading, isFetching } = useGetFavoritesQuery();
  const [removeFavorite, { isLoading: isRemoving }] =
    useRemoveFavoriteMutation();

  if (isLoading || isFetching) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">Loading…</p>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-amber-200/90 bg-amber-50/90 p-4 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100">
        <p>Could not connect to the database. Start PostgreSQL and set</p>
        <code className="mt-2 block text-xs">DATABASE_URL</code>
        <p className="mt-2 text-xs opacity-90">
          Install PostgreSQL, create a database and user, add the connection
          string to{" "}
          <code className="rounded bg-black/5 px-1 dark:bg-white/10">
            .env.local
          </code>
          , then run{" "}
          <code className="rounded bg-black/5 px-1 dark:bg-white/10">
            npm run db:deploy
          </code>{" "}
          and restart the dev server.
        </p>
      </div>
    );
  }

  const list = data?.favorites ?? [];

  if (!list.length) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50/80 px-6 py-12 text-center dark:border-zinc-700 dark:bg-zinc-900/40">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Nothing here yet. Open{" "}
          <Link
            href="/competitions"
            className="font-medium text-teal-800 underline-offset-2 hover:underline dark:text-teal-300"
          >
            competitions
          </Link>{" "}
          and tap &quot;Add to favorites&quot;.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid list-none gap-3 sm:grid-cols-2">
      {list.map((f) => (
        <li
          key={f.id}
          className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200/90 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/60"
        >
          <div className="min-w-0">
            <Link
              href={`/competitions/${encodeURIComponent(f.code)}`}
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              {f.name ?? f.code}
            </Link>
            <p className="text-xs text-zinc-500">{f.code}</p>
          </div>
          <button
            type="button"
            disabled={isRemoving}
            onClick={() => removeFavorite(f.code)}
            className="shrink-0 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-60 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
