import { useQuery } from '@tanstack/react-query';

const BASE_URL = 'https://appfeeds.orf.at/alpine.v2/api';

const ENDPOINTS = {
  stories: `${BASE_URL}/sporton?osType=1`,
  broadcasts: `${BASE_URL}/broadcasts?view=next&top=100`,
  cupRankingsWithId: (id) => `${BASE_URL}/cuprankings/${id}`,
  tvThek: `${BASE_URL}/TvThek?osType=1`,
  cupRankingsByGender: (id) => `${BASE_URL}/cuprankings?genderid=${id}`,
  athleteById: (id) => `${BASE_URL}/person/${id}`,
  events: `${BASE_URL}/sportevents?view=grouped`,
};

async function fetchFromAPI(url, init) {
  const res = await fetch(url, init);
  if (res.ok) {
    return res.json();
  }
  throw Error(`failed to fetch data': ${res.status}`);
}

async function fetchCupRanking({ queryKey }) {
  const [_key, id] = queryKey;
  const url = ENDPOINTS.cupRankingsWithId(id);
  return fetchFromAPI(url);
}

async function fetchCupRankings({ queryKey }) {
  const [_key, id] = queryKey;
  const url = ENDPOINTS.cupRankingsByGender(id);
  return fetchFromAPI(url);
}

async function fetchPerson({ queryKey }) {
  const [_key, id] = queryKey;
  const url = ENDPOINTS.athleteById(id);
  return fetchFromAPI(url);
}

export function useStories() {
  return useQuery({
    queryKey: ['storiesData'],
    queryFn: () => fetchFromAPI(ENDPOINTS.stories),
  });
}

export function useCupRankingById(id) {
  return useQuery({ queryKey: ['cupranking', id], queryFn: fetchCupRanking });
}

export function useCupRankingsByGender(id) {
  return useQuery({ queryKey: ['cuprankings', id], queryFn: fetchCupRankings });
}

export function usePersonBy(id) {
  return useQuery({ queryKey: ['person', id], queryFn: fetchPerson });
}

export function useTVStreams() {
  return useQuery({
    queryKey: ['tvstreams'],
    queryFn: () => fetchFromAPI(ENDPOINTS.broadcasts),
  });
}

export function useTVThek() {
  return useQuery({
    queryKey: ['tvthek'],
    queryFn: () => fetchFromAPI(ENDPOINTS.tvThek),
  });
}

export function useEvents(options) {
  return useQuery({
    queryKey: ['events'],
    queryFn: () => fetchFromAPI(ENDPOINTS.events),
    ...options,
  });
}
