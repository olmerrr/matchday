import type { Metadata } from "next";
import Link from "next/link";
import { CompetitionsList } from "@/components/competitions-list";
import { HomeChartsSection } from "@/components/home-charts-section";
import { HomeHero } from "@/components/home-hero";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <main
      className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-10 sm:px-6"
      suppressHydrationWarning
    >
      <HomeHero />
      <HomeChartsSection />
      <section
        className="rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-6"
        aria-labelledby="competitions-heading"
        suppressHydrationWarning
      >
        <div
          className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between"
          suppressHydrationWarning
        >
          <div suppressHydrationWarning>
            <h2
              id="competitions-heading"
              className="text-base font-semibold text-zinc-900 dark:text-zinc-100"
            >
              Competitions
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
              Popular leagues
            </p>
          </div>
          <Link
            href="/competitions"
            className="mt-3 text-sm font-medium text-teal-800 underline-offset-2 hover:underline sm:mt-0 dark:text-teal-300"
          >
            All competitions
          </Link>
        </div>
        <div className="mt-5" suppressHydrationWarning>
          <CompetitionsList limit={6} linkWhenCode />
        </div>
      </section>
    </main>
  );
}
