import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  CompetitionDto,
  CompetitionsApiResponse,
  MatchesApiResponse,
  ScorersApiResponse,
  StandingsApiResponse,
} from "@/lib/football-data/types";

export type CompetitionsQueryParams = {
  areas?: string;
  plan?: string;
};

export type FavoriteCompetitionDto = {
  id: string;
  code: string;
  name: string | null;
  createdAt: string;
};

export type FavoritesListResponse = {
  favorites: FavoriteCompetitionDto[];
};

export type MatchesQueryParams = {
  competitions?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
};

export const footballApi = createApi({
  reducerPath: "footballApi",
  tagTypes: ["Favorite"],
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  endpoints: (builder) => ({
    getCompetitions: builder.query<
      CompetitionsApiResponse,
      CompetitionsQueryParams | void
    >({
      query: (params) => ({
        url: "/api/competitions",
        params: params ?? {},
      }),
    }),
    getCompetition: builder.query<CompetitionDto, string>({
      query: (code) => ({
        url: `/api/competitions/${encodeURIComponent(code)}`,
      }),
    }),
    getStandings: builder.query<StandingsApiResponse, string>({
      query: (code) => ({
        url: `/api/competitions/${encodeURIComponent(code)}/standings`,
      }),
    }),
    getMatches: builder.query<MatchesApiResponse, MatchesQueryParams | void>({
      query: (params) => ({
        url: "/api/matches",
        params: params ?? {},
      }),
    }),
    getScorers: builder.query<ScorersApiResponse, string>({
      query: (code) => ({
        url: `/api/competitions/${encodeURIComponent(code)}/scorers`,
      }),
    }),
    getFavorites: builder.query<FavoritesListResponse, void>({
      query: () => ({ url: "/api/favorites" }),
      providesTags: ["Favorite"],
    }),
    addFavorite: builder.mutation<
      FavoriteCompetitionDto,
      { code: string; name?: string }
    >({
      query: (body) => ({
        url: "/api/favorites",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Favorite"],
    }),
    removeFavorite: builder.mutation<void, string>({
      query: (code) => ({
        url: `/api/favorites/${encodeURIComponent(code)}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favorite"],
    }),
  }),
});

export const {
  useGetCompetitionsQuery,
  useGetCompetitionQuery,
  useGetStandingsQuery,
  useGetMatchesQuery,
  useGetScorersQuery,
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = footballApi;
