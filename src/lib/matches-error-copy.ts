function humanizeErrorDetail(text: string | undefined): string | undefined {
  if (!text) {
    return undefined;
  }
  const t = text.trim();
  if (!t.startsWith("{")) {
    return t;
  }
  try {
    const o = JSON.parse(t) as { message?: string };
    if (typeof o.message === "string" && o.message.length > 0) {
      return o.message;
    }
  } catch {
    return t;
  }
  return t;
}

export type MatchesErrorHelp = {
  title: string;
  detail?: string;
  tips: string[];
};

export function matchesErrorCopy(error: unknown): MatchesErrorHelp {
  const browse =
    "Competitions and league pages may still work — open a league from Competitions.";
  const token =
    "If you use a football-data.org key, check FOOTBALL_DATA_API_TOKEN in .env.local and restart the dev server.";
  const paidWindow =
    "On a paid football-data plan you can raise FOOTBALL_DATA_MATCH_MAX_DAYS in the server environment (see .env.example).";

  if (!error || typeof error !== "object") {
    return {
      title: "Fixtures are unavailable right now.",
      tips: [browse, token],
    };
  }

  if ("status" in error && error.status === "FETCH_ERROR") {
    return {
      title: "Could not reach this app’s API.",
      tips: ["Check your network, then reload the page.", browse],
    };
  }

  if ("status" in error && typeof error.status === "number") {
    const raw = "data" in error ? error.data : undefined;
    const payload =
      raw && typeof raw === "object" && "error" in raw
        ? (raw as { error?: { message?: string } }).error
        : undefined;
    const upstream = humanizeErrorDetail(
      typeof payload?.message === "string" && payload.message.length > 0
        ? payload.message
        : undefined
    );
    const st = error.status;

    if (st === 400) {
      const low = upstream?.toLowerCase() ?? "";
      const period =
        low.includes("10 days") ||
        low.includes("period") ||
        low.includes("date");
      return {
        title: period
          ? "The live feed only accepts a short date window on your account."
          : "The fixtures request was not accepted.",
        detail: upstream,
        tips: period
          ? [
              "This app already caps how many days it asks for; you should see fixtures for roughly the next week on a free key.",
              paidWindow,
              browse,
            ]
          : [browse, token],
      };
    }

    if (st === 401 || st === 403) {
      return {
        title: "Live fixtures are turned off for this setup.",
        detail: upstream,
        tips: [
          token,
          "Some accounts only allow certain leagues; pick one competition from the list and try again.",
        ],
      };
    }
    if (st === 429) {
      return {
        title: "Too many requests — please wait a bit.",
        detail: upstream,
        tips: ["Free keys are rate-limited; retry in a minute.", browse],
      };
    }
    if (st === 504) {
      return {
        title: "The fixtures request timed out.",
        detail: upstream,
        tips: [
          "Try again, or filter by a single competition to reduce load.",
          browse,
        ],
      };
    }
    if (st === 503) {
      return {
        title: "The API is not configured for live data.",
        detail: upstream,
        tips: [token, browse],
      };
    }

    return {
      title: "We could not load the fixture list.",
      detail: upstream,
      tips: [browse, token],
    };
  }

  return {
    title: "We could not load the fixture list.",
    tips: [browse, token],
  };
}
