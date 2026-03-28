"use client";

import {
  useAddFavoriteMutation,
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from "@/store/footballApi";

type CompetitionFavoriteButtonProps = {
  code: string;
  name: string;
};

export function CompetitionFavoriteButton({
  code,
  name,
}: CompetitionFavoriteButtonProps) {
  const { data, isLoading, isError } = useGetFavoritesQuery();
  const [addFavorite, { isLoading: isAdding }] = useAddFavoriteMutation();
  const [removeFavorite, { isLoading: isRemoving }] =
    useRemoveFavoriteMutation();

  const isFavorite = data?.favorites.some((f) => f.code === code) ?? false;
  const busy = isAdding || isRemoving;

  if (isError) {
    return (
      <p className="max-w-xs text-xs text-amber-800 dark:text-amber-200/90">
        Favorites unavailable: check PostgreSQL and{" "}
        <code className="rounded bg-black/5 px-0.5 dark:bg-white/10">
          DATABASE_URL
        </code>
        .
      </p>
    );
  }

  if (isLoading && !data) {
    return (
      <span className="inline-block h-9 w-36 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-700" />
    );
  }

  if (isFavorite) {
    return (
      <button
        type="button"
        disabled={busy}
        onClick={() => removeFavorite(code)}
        className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50 disabled:opacity-60 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        {isRemoving ? "…" : "Remove from favorites"}
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={busy}
      onClick={() => addFavorite({ code, name })}
      className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600 disabled:opacity-60"
    >
      {isAdding ? "…" : "Add to favorites"}
    </button>
  );
}
