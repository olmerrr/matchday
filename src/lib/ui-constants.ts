export const BREAKPOINT_SM_PX = 640;

export const ROUTE_LOADING_SPINNER_CLASS =
  "h-12 w-12 shrink-0 animate-spin rounded-full border-[3px] border-teal-600 border-t-transparent dark:border-teal-500 dark:border-t-transparent";

export const MATCH_CREST_PX = 36;

export const CHART_POINTS_HEIGHT_CLASS =
  "mt-4 h-[260px] w-full min-h-[220px] min-w-0 sm:mt-6 sm:h-[340px] md:h-[380px]";

export const CHART_WDL_HEIGHT_CLASS =
  "mt-4 h-[260px] w-full min-h-[220px] sm:h-[300px]";

export const HOME_CHARTS_SKELETON_LEFT_CLASS =
  "h-[320px] rounded-xl bg-zinc-100 dark:bg-zinc-800/80 sm:h-[380px]";

export const HOME_CHARTS_SKELETON_RIGHT_CLASS =
  "h-[320px] rounded-xl bg-zinc-100 dark:bg-zinc-800/80 sm:h-[340px]";

export const STANDINGS_POINTS = {
  labelMaxNarrow: 12,
  labelMaxWide: 22,
  barMaxNarrow: 22,
  barMaxWide: 28,
  yAxisWidthNarrow: 72,
  yAxisWidthWide: 118,
  marginLeftNarrow: 2,
  marginLeftWide: 4,
  marginRightNarrow: 6,
  marginRightWide: 12,
  tickNarrow: 10,
  tickWide: 11,
} as const;

export const STANDINGS_WDL = {
  labelMaxNarrow: 12,
  labelMaxWide: 18,
  yAxisWidthNarrow: 68,
  yAxisWidthWide: 100,
  marginLeftNarrow: 4,
  marginLeftWide: 8,
  marginRightNarrow: 8,
  marginRightWide: 16,
  marginBottomNarrow: 28,
  marginBottomWide: 8,
  tickSize: 10,
  maxBarSize: 32,
} as const;

export const MATCH_STATUS_FILTER_OPTIONS = [
  { value: "", label: "Any" },
  { value: "SCHEDULED", label: "Scheduled" },
  { value: "FINISHED", label: "Finished" },
  { value: "LIVE", label: "Live" },
] as const;
