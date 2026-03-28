import type { Metadata } from "next";
import { CompetitionsList } from "@/components/competitions-list";

export const metadata: Metadata = {
  title: "Competitions",
};

export default function CompetitionsPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Competitions
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Pick a league or tournament. Tap a code to open a short info page.
        </p>
      </div>
      <section
        className="rounded-xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60"
        aria-labelledby="all-competitions"
      >
        <h2
          id="all-competitions"
          className="sr-only"
        >
          Full list
        </h2>
        <CompetitionsList linkWhenCode />
      </section>
    </main>
  );
}
