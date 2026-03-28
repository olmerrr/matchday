"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useChartNarrow } from "@/hooks/use-chart-narrow";
import { useGetStandingsQuery } from "@/store/footballApi";
import {
  CHART_WDL_HEIGHT_CLASS,
  STANDINGS_WDL,
} from "@/lib/ui-constants";
import { StandingsWdlTooltipContent } from "@/components/standings-chart-tooltips";

type StandingsWdlChartProps = {
  competitionCode: string;
  topN?: number;
};

export function StandingsWdlChart({
  competitionCode,
  topN = 6,
}: StandingsWdlChartProps) {
  const narrow = useChartNarrow();
  const { data, error, isLoading, isFetching } =
    useGetStandingsQuery(competitionCode);

  const chartData = useMemo(() => {
    if (!data?.rows.length) return [];
    const maxLen = narrow
      ? STANDINGS_WDL.labelMaxNarrow
      : STANDINGS_WDL.labelMaxWide;
    return [...data.rows]
      .sort((a, b) => a.position - b.position)
      .slice(0, topN)
      .reverse()
      .map((r) => ({
        name:
          r.name.length > maxLen ? `${r.name.slice(0, maxLen)}…` : r.name,
        fullName: r.name,
        won: r.won,
        draw: r.draw,
        lost: r.lost,
      }));
  }, [data, topN, narrow]);

  if (isLoading || isFetching) {
    return (
      <div
        className="rounded-xl border border-zinc-200/90 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-6"
        aria-busy
      >
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Wins, draws, losses
        </h3>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          Loading…
        </p>
      </div>
    );
  }

  if (error || !chartData.length) {
    return (
      <div className="rounded-xl border border-zinc-200/90 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-6">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Wins, draws, losses
        </h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          No data for this chart.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-200/90 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-6">
      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        Top {topN}: match outcomes
      </h3>
      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
        Stacked bars by games played
      </p>
      <div className={CHART_WDL_HEIGHT_CLASS}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{
              left: narrow
                ? STANDINGS_WDL.marginLeftNarrow
                : STANDINGS_WDL.marginLeftWide,
              right: narrow
                ? STANDINGS_WDL.marginRightNarrow
                : STANDINGS_WDL.marginRightWide,
              top: 8,
              bottom: narrow
                ? STANDINGS_WDL.marginBottomNarrow
                : STANDINGS_WDL.marginBottomWide,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d8" />
            <XAxis
              type="number"
              tick={{ fontSize: STANDINGS_WDL.tickSize, fill: "#71717a" }}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={
                narrow
                  ? STANDINGS_WDL.yAxisWidthNarrow
                  : STANDINGS_WDL.yAxisWidthWide
              }
              tick={{ fontSize: STANDINGS_WDL.tickSize, fill: "#71717a" }}
            />
            <Tooltip
              content={(props) => <StandingsWdlTooltipContent {...props} />}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
            />
            <Bar
              dataKey="won"
              stackId="wdl"
              fill="#0d9488"
              radius={[0, 0, 0, 0]}
              name="Wins"
              maxBarSize={STANDINGS_WDL.maxBarSize}
            />
            <Bar
              dataKey="draw"
              stackId="wdl"
              fill="#a1a1aa"
              name="Draws"
              maxBarSize={STANDINGS_WDL.maxBarSize}
            />
            <Bar
              dataKey="lost"
              stackId="wdl"
              fill="#dc2626"
              radius={[0, 6, 6, 0]}
              name="Losses"
              maxBarSize={STANDINGS_WDL.maxBarSize}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
