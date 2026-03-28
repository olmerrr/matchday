"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Link from "next/link";
import { useChartNarrow } from "@/hooks/use-chart-narrow";
import { useGetStandingsQuery } from "@/store/footballApi";
import {
  CHART_POINTS_HEIGHT_CLASS,
  STANDINGS_POINTS,
} from "@/lib/ui-constants";
import { StandingsPointsTooltipContent } from "@/components/standings-chart-tooltips";

type StandingsPointsChartProps = {
  competitionCode: string;
  topN?: number;
  title: string;
  subtitle?: string;
  embed?: boolean;
};

export function StandingsPointsChart({
  competitionCode,
  topN = 10,
  title,
  subtitle,
  embed = false,
}: StandingsPointsChartProps) {
  const narrow = useChartNarrow();
  const { data, error, isLoading, isFetching } =
    useGetStandingsQuery(competitionCode);

  const chartData = useMemo(() => {
    if (!data?.rows.length) return [];
    const maxLen = narrow
      ? STANDINGS_POINTS.labelMaxNarrow
      : STANDINGS_POINTS.labelMaxWide;
    return [...data.rows]
      .sort((a, b) => a.position - b.position)
      .slice(0, topN)
      .reverse()
      .map((r) => ({
        name:
          r.name.length > maxLen ? `${r.name.slice(0, maxLen)}…` : r.name,
        fullName: r.name,
        points: r.points,
      }));
  }, [data, topN, narrow]);

  const shellClass = embed
    ? "rounded-xl border border-zinc-200/90 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-6"
    : "mb-10 rounded-xl border border-zinc-200/90 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-6";

  if (isLoading || isFetching) {
    return (
      <section className={shellClass} aria-busy>
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h2>
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
          Loading table…
        </p>
      </section>
    );
  }

  if (error || !chartData.length) {
    return (
      <section className={shellClass}>
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Table unavailable (API limit or no data for this league).
        </p>
        <Link
          href={`/competitions/${encodeURIComponent(competitionCode)}`}
          className="mt-3 inline-block min-h-11 py-2.5 text-sm font-medium text-teal-800 underline-offset-2 hover:underline dark:text-teal-300"
        >
          League page
        </Link>
      </section>
    );
  }

  return (
    <section
      className={shellClass}
      aria-labelledby="standings-chart-title"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id="standings-chart-title"
            className="text-base font-semibold text-zinc-900 dark:text-zinc-400"
          >
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
              {subtitle}
            </p>
          ) : null}
        </div>
        <Link
          href={`/competitions/${encodeURIComponent(competitionCode)}`}
          className="mt-2 inline-flex min-h-11 items-center text-sm font-medium text-teal-800 underline-offset-2 hover:underline sm:mt-0 dark:text-teal-300"
        >
          About league
        </Link>
      </div>
      <div className={CHART_POINTS_HEIGHT_CLASS}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{
              left: narrow
                ? STANDINGS_POINTS.marginLeftNarrow
                : STANDINGS_POINTS.marginLeftWide,
              right: narrow
                ? STANDINGS_POINTS.marginRightNarrow
                : STANDINGS_POINTS.marginRightWide,
              top: 8,
              bottom: 8,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d8" />
            <XAxis
              type="number"
              tick={{
                fontSize: narrow
                  ? STANDINGS_POINTS.tickNarrow
                  : STANDINGS_POINTS.tickWide,
                fill: "#71717a",
              }}
              allowDecimals={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={
                narrow
                  ? STANDINGS_POINTS.yAxisWidthNarrow
                  : STANDINGS_POINTS.yAxisWidthWide
              }
              tick={{
                fontSize: narrow
                  ? STANDINGS_POINTS.tickNarrow
                  : STANDINGS_POINTS.tickWide,
                fill: "#71717a",
              }}
            />
            <Tooltip
              cursor={{ fill: "rgba(13, 148, 136, 0.08)" }}
              content={(props) => <StandingsPointsTooltipContent {...props} />}
            />
            <Bar
              dataKey="points"
              fill="#0d9488"
              radius={[0, 6, 6, 0]}
              maxBarSize={
                narrow
                  ? STANDINGS_POINTS.barMaxNarrow
                  : STANDINGS_POINTS.barMaxWide
              }
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
