import type { CompetitionsApiResponse } from "@/lib/football-data/types";
import {
  FALLBACK_LEAGUES,
  HOME_CHARTS_MAX_LEAGUE_OPTIONS,
  HOME_CHARTS_MERGE_MIN_FROM_API,
  type LeagueOption,
} from "@/lib/fallback-leagues";

export function buildHomeChartOptions(
  compsData: CompetitionsApiResponse | undefined
): LeagueOption[] {
  const fromApi =
    compsData?.competitions
      .filter((c): c is typeof c & { code: string } => Boolean(c.code))
      .map((c) => ({ code: c.code, name: c.name })) ?? [];
  if (fromApi.length >= HOME_CHARTS_MERGE_MIN_FROM_API) {
    const codes = new Set(fromApi.map((x) => x.code));
    const merged: LeagueOption[] = [...fromApi];
    for (const f of FALLBACK_LEAGUES) {
      if (!codes.has(f.code)) {
        merged.push(f);
        codes.add(f.code);
      }
    }
    return merged.slice(0, HOME_CHARTS_MAX_LEAGUE_OPTIONS);
  }
  return [...FALLBACK_LEAGUES];
}
