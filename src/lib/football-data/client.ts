const BASE_URL = "https://api.football-data.org/v4";

export class FootballDataMissingTokenError extends Error {
  constructor() {
    super("FOOTBALL_DATA_API_TOKEN is not set");
    this.name = "FootballDataMissingTokenError";
  }
}

export async function footballDataGet(
  path: string,
  searchParams?: URLSearchParams
): Promise<Response> {
  const token = process.env.FOOTBALL_DATA_API_TOKEN;
  if (!token) {
    throw new FootballDataMissingTokenError();
  }
  const url = new URL(`${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`);
  if (searchParams) {
    searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
  }
  return fetch(url.toString(), {
    headers: {
      "X-Auth-Token": token,
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(25_000),
  });
}
