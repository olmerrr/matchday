"use client";

import Image from "next/image";
import Link from "next/link";
import type { MatchDto } from "@/lib/football-data/types";
import { MATCH_CREST_PX } from "@/lib/ui-constants";
import {
  formatMatchKickoffUtc,
  matchStatusClass,
  matchStatusLabel,
} from "@/lib/matches-display";

type MatchListItemProps = {
  match: MatchDto;
};

export function MatchListItem({ match: m }: MatchListItemProps) {
  const crestSize = MATCH_CREST_PX;

  return (
    <li className="rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-500">
        <span>{formatMatchKickoffUtc(m.utcDate)}</span>
        <div className="flex flex-wrap items-center gap-2">
          {m.competitionCode ? (
            <Link
              href={`/competitions/${encodeURIComponent(m.competitionCode)}`}
              className="font-medium text-teal-800 underline-offset-2 hover:underline dark:text-teal-300"
            >
              {m.competitionName}
            </Link>
          ) : (
            <span>{m.competitionName}</span>
          )}
          {m.matchday != null ? (
            <span className="rounded-md bg-zinc-100 px-2 py-0.5 dark:bg-zinc-800">
              MD {m.matchday}
            </span>
          ) : null}
          <span
            className={`rounded-md px-2 py-0.5 font-medium ${matchStatusClass(m.status)}`}
          >
            {matchStatusLabel(m.status)}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {m.homeTeam.crest ? (
            <div className="relative h-9 w-9 shrink-0">
              <Image
                src={m.homeTeam.crest}
                alt=""
                width={crestSize}
                height={crestSize}
                className="object-contain"
                unoptimized
              />
            </div>
          ) : (
            <div className="h-9 w-9 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          )}
          <span className="truncate font-medium text-zinc-900 dark:text-zinc-100">
            {m.homeTeam.shortName ?? m.homeTeam.name}
          </span>
        </div>
        <div className="hidden shrink-0 text-sm font-semibold text-zinc-400 sm:block">
          vs
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-end gap-3">
          <span className="truncate text-right font-medium text-zinc-900 dark:text-zinc-100 sm:text-left">
            {m.awayTeam.shortName ?? m.awayTeam.name}
          </span>
          {m.awayTeam.crest ? (
            <div className="relative h-9 w-9 shrink-0">
              <Image
                src={m.awayTeam.crest}
                alt=""
                width={crestSize}
                height={crestSize}
                className="object-contain"
                unoptimized
              />
            </div>
          ) : (
            <div className="h-9 w-9 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          )}
        </div>
      </div>
    </li>
  );
}
