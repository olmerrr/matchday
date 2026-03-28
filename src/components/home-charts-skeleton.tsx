import {
  HOME_CHARTS_SKELETON_LEFT_CLASS,
  HOME_CHARTS_SKELETON_RIGHT_CLASS,
} from "@/lib/ui-constants";

export function HomeChartsSkeleton() {
  return (
    <section
      className="mb-10 rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 sm:p-6"
      aria-labelledby="home-stats-heading"
      aria-busy
      suppressHydrationWarning
    >
      <div
        className="flex flex-col gap-4 border-b border-zinc-100 pb-5 dark:border-zinc-800/80 sm:flex-row sm:items-end sm:justify-between"
        suppressHydrationWarning
      >
        <div suppressHydrationWarning>
          <h2
            id="home-stats-heading"
            className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Tournament stats
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
            Pick a league — charts update (football-data.org).
          </p>
        </div>
      </div>
      <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
        Loading charts…
      </p>
      <div
        className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8"
        suppressHydrationWarning
      >
        <div
          className={HOME_CHARTS_SKELETON_LEFT_CLASS}
          suppressHydrationWarning
        />
        <div
          className={HOME_CHARTS_SKELETON_RIGHT_CLASS}
          suppressHydrationWarning
        />
      </div>
    </section>
  );
}
