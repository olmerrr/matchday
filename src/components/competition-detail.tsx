"use client";

import Image from "next/image";
import Link from "next/link";
import { CompetitionFavoriteButton } from "@/components/competition-favorite-button";
import { CompetitionScorers } from "@/components/competition-scorers";
import { useGetCompetitionQuery } from "@/store/footballApi";

type CompetitionDetailProps = {
  code: string;
};

export function CompetitionDetail({ code }: CompetitionDetailProps) {
  const { data, error, isLoading, isFetching } = useGetCompetitionQuery(code);

  if (isLoading || isFetching) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Loading…
      </p>
    );
  }

  if (error) {
    const status = "status" in error ? error.status : undefined;
    return (
      <div className="rounded-lg border border-red-200/80 bg-red-50/80 p-4 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
        {status === 404 ? (
          <p>Competition not found.</p>
        ) : (
          <p>
            Could not load data
            {status != null ? ` (${status})` : ""}.
          </p>
        )}
        <Link
          href="/competitions"
          className="mt-3 inline-block font-medium text-teal-800 underline-offset-2 hover:underline dark:text-teal-300"
        >
          Back to competitions
        </Link>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        {data.emblem ? (
          <div className="relative h-20 w-20 shrink-0">
            <Image
              src={data.emblem}
              alt=""
              width={80}
              height={80}
              className="object-contain"
              unoptimized
            />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {data.name}
            </h1>
            {data.code ? (
              <CompetitionFavoriteButton code={data.code} name={data.name} />
            ) : null}
          </div>
          <dl className="mt-4 grid gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            {data.code ? (
              <div className="flex gap-2">
                <dt className="font-medium text-zinc-500 dark:text-zinc-500">
                  Code
                </dt>
                <dd>{data.code}</dd>
              </div>
            ) : null}
            <div className="flex gap-2">
              <dt className="font-medium text-zinc-500 dark:text-zinc-500">
                Type
              </dt>
              <dd>{data.type}</dd>
            </div>
          </dl>
          <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-500">
            Full fixture list: open the{" "}
            <Link
              href="/matches"
              className="font-medium text-teal-800 underline-offset-2 hover:underline dark:text-teal-300"
            >
              Matches
            </Link>{" "}
            page and filter by this competition.
          </p>
        </div>
      </div>
      <CompetitionScorers code={code} />
    </div>
  );
}
