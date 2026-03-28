export type LeagueOption = { code: string; name: string };

export const FALLBACK_LEAGUES: readonly LeagueOption[] = [
  { code: "PL", name: "Premier League" },
  { code: "BL1", name: "Bundesliga" },
  { code: "SA", name: "Serie A" },
  { code: "PD", name: "La Liga" },
  { code: "FL1", name: "Ligue 1" },
  { code: "CL", name: "Champions League" },
  { code: "ELC", name: "Championship" },
  { code: "DED", name: "Eredivisie" },
] as const;

export const HOME_CHARTS_MERGE_MIN_FROM_API = 4;

export const HOME_CHARTS_MAX_LEAGUE_OPTIONS = 16;
