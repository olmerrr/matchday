"use client";

import Link from "next/link";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { useGetCompetitionsQuery } from "@/store/footballApi";

type CompetitionsListProps = {
  limit?: number;
  linkWhenCode?: boolean;
};

export function CompetitionsList({
  limit,
  linkWhenCode = false,
}: CompetitionsListProps) {
  const mounted = useHasMounted();
  const { data, error, isLoading, isFetching } = useGetCompetitionsQuery();

  if (!mounted || isLoading || isFetching) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Loading leagues…
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-red-600 dark:text-red-400">
        Failed to load:{" "}
        {"status" in error ? String(error.status) : "error"}
      </p>
    );
  }

  if (!data?.competitions.length) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        No leagues returned.
      </p>
    );
  }

  const list =
    limit !== undefined ? data.competitions.slice(0, limit) : data.competitions;

  return (
    <ul className="grid list-none gap-2 sm:grid-cols-2">
      {list.map((c) => {
        const inner = (
          <>
            <span className="font-medium">{c.name}</span>
            {c.code ? (
              <span className="ml-2 text-zinc-500 dark:text-zinc-400">
                {c.code}
              </span>
            ) : null}
          </>
        );
        const cardClass =
          "rounded-xl border border-zinc-100 bg-zinc-50/80 px-3 py-2.5 text-sm text-zinc-800 dark:border-zinc-700/80 dark:bg-zinc-800/40 dark:text-zinc-200";

        if (linkWhenCode && c.code) {
          return (
            <li key={c.id}>
              <Link
                href={`/competitions/${encodeURIComponent(c.code)}`}
                className={`${cardClass} flex min-h-12 items-center py-3 transition-colors hover:border-teal-600/40 hover:bg-teal-50/50 active:scale-[0.99] dark:hover:border-teal-500/30 dark:hover:bg-teal-950/30`}
              >
                {inner}
              </Link>
            </li>
          );
        }

        return (
          <li key={c.id} className={cardClass}>
            {inner}
          </li>
        );
      })}
    </ul>
  );
}
