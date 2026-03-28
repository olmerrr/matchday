"use client";

import { useMemo, useState } from "react";
import { useGetCompetitionsQuery, useGetMatchesQuery } from "@/store/footballApi";
import { matchesErrorCopy } from "@/lib/matches-error-copy";
import { MatchListItem } from "@/components/matches/match-list-item";
import { MatchesEmptyState } from "@/components/matches/matches-empty-state";
import { MatchesErrorAlert } from "@/components/matches/matches-error-alert";
import { MatchesFeedIntro } from "@/components/matches/matches-feed-intro";
import { MatchesFilters } from "@/components/matches/matches-filters";

export function MatchesFeed() {
  const { data: comps } = useGetCompetitionsQuery();
  const [competitionId, setCompetitionId] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const compOptions = useMemo(() => {
    const list = comps?.competitions.filter((c) => c.id != null) ?? [];
    return list;
  }, [comps]);

  const { data, error, isLoading, isFetching } = useGetMatchesQuery({
    competitions: competitionId || undefined,
    status: status || undefined,
  });

  const list = data?.matches ?? [];
  const showBlockingLoader = isLoading;
  const errorHelp = error ? matchesErrorCopy(error) : null;

  return (
    <div className="space-y-6">
      <MatchesFeedIntro />
      <MatchesFilters
        compOptions={compOptions}
        competitionId={competitionId}
        onCompetitionChange={setCompetitionId}
        status={status}
        onStatusChange={setStatus}
      />

      {showBlockingLoader ? (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Loading fixtures…
        </p>
      ) : null}

      {isFetching && !showBlockingLoader ? (
        <p className="text-xs text-zinc-500 dark:text-zinc-500">Updating…</p>
      ) : null}

      {error && errorHelp ? <MatchesErrorAlert help={errorHelp} /> : null}

      {!showBlockingLoader && !error && list.length === 0 ? (
        <MatchesEmptyState />
      ) : null}

      <ul className="space-y-3">
        {list.map((m) => (
          <MatchListItem key={m.id} match={m} />
        ))}
      </ul>
    </div>
  );
}
