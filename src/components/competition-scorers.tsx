"use client";

import Image from "next/image";
import type { ScorerRowDto } from "@/lib/football-data/types";
import { useGetScorersQuery } from "@/store/footballApi";

type CompetitionScorersProps = {
  code: string;
};

function scorerErrorText(error: unknown): string | null {
  if (!error || typeof error !== "object") return null;
  if (!("data" in error)) return null;
  const d = error.data as { error?: { message?: string } } | undefined;
  const m = d?.error?.message;
  return typeof m === "string" && m.length > 0 ? m : null;
}

export function CompetitionScorers({ code }: CompetitionScorersProps) {
  const { data, error, isLoading, isFetching } = useGetScorersQuery(code);

  const list = data?.scorers ?? [];
  const upstreamDetail = scorerErrorText(error);

  if (isLoading) {
    return (
      <section
        className="rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-6"
        aria-busy
      >
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          Top scorers
        </h2>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          Loading…
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-6">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          Top scorers
        </h2>
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">
          Could not load scorers. Many free football-data tokens do not include
          this endpoint for every league.
          {upstreamDetail ? ` (${upstreamDetail})` : ""}
        </p>
      </section>
    );
  }

  if (list.length === 0) {
    return (
      <section className="rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-6">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          Top scorers
        </h2>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          No scorer rows returned for this competition (season or API plan).
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-6">
      <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
        Top scorers
      </h2>
      {isFetching ? (
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
          Updating…
        </p>
      ) : (
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
          From football-data (current season where available).
        </p>
      )}
      <ol className="mt-4 divide-y divide-zinc-100 dark:divide-zinc-800">
        {list.map((s: ScorerRowDto, i: number) => (
          <li
            key={`${s.playerName}-${s.teamName}-${i}`}
            className="flex items-center gap-3 py-3 first:pt-0"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
              {i + 1}
            </span>
            {s.teamCrest ? (
              <div className="relative h-8 w-8 shrink-0">
                <Image
                  src={s.teamCrest}
                  alt=""
                  width={32}
                  height={32}
                  className="object-contain"
                  unoptimized
                />
              </div>
            ) : (
              <div className="h-8 w-8 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-zinc-900 dark:text-zinc-100">
                {s.playerName}
              </p>
              <p className="truncate text-xs text-zinc-500">{s.teamName}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
                {s.goals} goals
              </p>
              {s.assists != null ? (
                <p className="text-xs text-zinc-500">{s.assists} ast</p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
