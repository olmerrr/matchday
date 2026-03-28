import Link from "next/link";

export function MatchesEmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50/80 px-6 py-12 text-center dark:border-zinc-700 dark:bg-zinc-900/40">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        No fixtures for this filter and date range. Try another league, change
        status, or open a competition from{" "}
        <Link
          href="/competitions"
          className="font-medium text-teal-800 underline-offset-2 hover:underline dark:text-teal-300"
        >
          Competitions
        </Link>
        .
      </p>
    </div>
  );
}
