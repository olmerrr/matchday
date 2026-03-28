import type { Metadata } from "next";
import { MatchesFeed } from "@/components/matches-feed";

export const metadata: Metadata = {
  title: "Matches",
};

export default function MatchesPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Matches
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
        Upcoming and recent games from the live feed. The request window is kept
        short so it works on free data tiers; use the competition filter to
        focus on one league.
      </p>
      <div className="mt-8">
        <MatchesFeed />
      </div>
    </main>
  );
}
