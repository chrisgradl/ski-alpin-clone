import React from 'react';

import ErrorBanner from '../components/ErrorBanner';
import LoadingView from '../components/LoadingView';
import WCRanking from '../components/WCRanking';
import { useCupRankingById } from '../hooks/dataHooks';

export default function RankingsDetailScreen({ route }) {
  const { cup, CupRankingId } = route.params;

  const { data, isPending, error, refetch } = useCupRankingById(
    CupRankingId || cup?.CupRankingId,
  );

  if (isPending) {
    return <LoadingView />;
  }

  if (error) {
    return <ErrorBanner onPress={refetch} visible={error} />;
  }

  return <WCRanking data={data} />;
}
