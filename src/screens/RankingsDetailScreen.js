import {ActivityIndicator, Alert, Button, Text, View} from 'react-native';
import WCRanking from '../components/WCRanking';
import {useCupRankingById} from '../hooks/dataHooks';
import React from 'react';

const data = require('../data/ranking-slalom.json')

export default function RankingsDetailScreen({navigation, route}) {

  const { cup } = route.params;

  const { data, isPending, error, refetch } = useCupRankingById(cup.CupRankingId);

  if (isPending) {
    return <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator size="large" /></View>
  }

  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>Error Loading Data: {error.message}</Text>
        <Button title="try again" onPress={refetch} />
      </View>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <WCRanking data={data} />
    </>
  );
}
