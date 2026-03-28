"use client";

import type { CompetitionDto } from "@/lib/football-data/types";
import { MATCH_STATUS_FILTER_OPTIONS } from "@/lib/ui-constants";

const selectClass =
  "h-12 w-full cursor-pointer rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-base text-zinc-900 outline-none ring-teal-600/30 focus:ring-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100";

type MatchesFiltersProps = {
  compOptions: CompetitionDto[];
  competitionId: string;
  onCompetitionChange: (id: string) => void;
  status: string;
  onStatusChange: (s: string) => void;
};

export function MatchesFilters({
  compOptions,
  competitionId,
  onCompetitionChange,
  status,
  onStatusChange,
}: MatchesFiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200/90 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50 sm:flex-row sm:flex-wrap sm:items-end sm:gap-4">
      <label className="block min-w-0 flex-1 sm:min-w-[200px]">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-zinc-500">
          Competition
        </span>
        <select
          value={competitionId}
          onChange={(e) => onCompetitionChange(e.target.value)}
          className={selectClass}
        >
          <option value="">All available leagues</option>
          {compOptions.map((c) => (
            <option key={c.id} value={String(c.id)}>
              {c.name}
              {c.code ? ` (${c.code})` : ""}
            </option>
          ))}
        </select>
      </label>
      <label className="block w-full sm:w-44">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-zinc-500">
          Status
        </span>
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className={selectClass}
        >
          {MATCH_STATUS_FILTER_OPTIONS.map((o) => (
            <option key={o.value || "any"} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
