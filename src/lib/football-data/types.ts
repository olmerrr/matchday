export type CompetitionDto = {
  id: number;
  name: string;
  code: string | null;
  type: string;
  emblem: string | null;
};

export type CompetitionsApiResponse = {
  count: number;
  competitions: CompetitionDto[];
};

export type FootballDataCompetitionRaw = {
  id: number;
  name: string;
  code: string | null;
  type: string;
  emblem: string | null;
};

export type FootballDataCompetitionsListRaw = {
  count?: number;
  competitions?: FootballDataCompetitionRaw[];
};

export type StandingRowDto = {
  position: number;
  name: string;
  played: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  crest: string | null;
};

export type StandingsApiResponse = {
  competitionCode: string;
  rows: StandingRowDto[];
};

export type MatchTeamDto = {
  name: string;
  shortName: string | null;
  crest: string | null;
};

export type MatchDto = {
  id: number;
  utcDate: string;
  status: string;
  matchday: number | null;
  homeTeam: MatchTeamDto;
  awayTeam: MatchTeamDto;
  competitionName: string;
  competitionCode: string | null;
};

export type MatchesApiResponse = {
  count: number;
  matches: MatchDto[];
};

export type ScorerRowDto = {
  playerName: string;
  teamName: string;
  teamCrest: string | null;
  goals: number;
  assists: number | null;
};

export type ScorersApiResponse = {
  competitionCode: string;
  scorers: ScorerRowDto[];
};
