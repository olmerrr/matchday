"use client";

import { useMemo, useState } from "react";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { useGetCompetitionsQuery } from "@/store/footballApi";
import { buildHomeChartOptions } from "@/lib/build-home-chart-options";
import { HomeChartsLeagueToolbar } from "@/components/home-charts-league-toolbar";
import { HomeChartsSkeleton } from "@/components/home-charts-skeleton";
import { StandingsPointsChart } from "@/components/standings-points-chart";
import { StandingsWdlChart } from "@/components/standings-wdl-chart";

export function HomeChartsSection() {
  const mounted = useHasMounted();
  const { data: compsData } = useGetCompetitionsQuery();
  const options = useMemo(
    () => buildHomeChartOptions(compsData),
    [compsData]
  );

  const [code, setCode] = useState("PL");

  const currentName = options.find((o) => o.code === code)?.name ?? code;

  if (!mounted) {
    return <HomeChartsSkeleton />;
  }

  return (
    <section
      className="mb-10 rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 sm:p-6"
      aria-labelledby="home-stats-heading"
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

      <HomeChartsLeagueToolbar
        options={options}
        code={code}
        onCodeChange={setCode}
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="min-w-0">
          <StandingsPointsChart
            competitionCode={code}
            topN={10}
            title={`${currentName} — points`}
            subtitle="Top teams by points"
            embed
          />
        </div>
        <div className="min-w-0">
          <StandingsWdlChart competitionCode={code} topN={6} />
        </div>
      </div>
    </section>
  );
}
