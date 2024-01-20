import {useQuery} from '@tanstack/react-query';
import {Alert} from 'react-native';

const BASE_URL = 'https://appfeeds.orf.at/alpine.v2/api';

const ENDPOINTS = {
  stories: `${BASE_URL}/sporton?osType=1`,
  broadcasts: `${BASE_URL}/broadcasts?view=next&top=100`,
  cupRankingsWithId: id => `${BASE_URL}/cuprankings/${id}`,
};

async function fetchFromAPI(url, init) {
  const res = await fetch(url, init);
  if (res.ok) {
    return res.json();
  }
  throw Error(`failed to fetch data': ${res.status}`);
}

async function fetchCupRanking({queryKey}) {
  const [_key, id] = queryKey;
  const url = ENDPOINTS.cupRankingsWithId(id);
  return fetchFromAPI(url);
}


export function useStories() {
  return useQuery({queryKey: ['storiesData'], queryFn: () => fetchFromAPI(ENDPOINTS.stories)});
}

export function useCupRankingById(id) {
  return useQuery({queryKey: ['cupranking', id], queryFn: fetchCupRanking});
}

export function useTVStreams() {
  return useQuery({queryKey: ['tvstreams'], queryFn: () => fetchFromAPI(ENDPOINTS.broadcasts)});
}
