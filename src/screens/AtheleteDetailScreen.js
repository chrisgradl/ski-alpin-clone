import React from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';

import AtheleteInfo from '../components/AthleteInfo';
import ErrorBanner from '../components/ErrorBanner';
import LoadingView from '../components/LoadingView';
import Spacer from '../components/Spacer';
import WcPlacing from '../components/WcPlacing';
import { usePersonBy } from '../hooks/dataHooks';

export default function AtheleteDetailScreen({ navigation, route }) {
  const { data, refetch, error, isPending } = usePersonBy(
    route.params?.data?.PersonId ?? route.params?.id,
  );

  if (isPending) {
    return <LoadingView />;
  }

  if (error) {
    return <ErrorBanner onPress={refetch} visible={error} />;
  }

  return (
    <ScrollView>
      <AtheleteInfo data={data} />
      <Spacer size={24} />
      <WcPlacing data={data} />
    </ScrollView>
  );
}
