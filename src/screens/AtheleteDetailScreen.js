import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AtheleteInfo from '../components/AthleteInfo';
import WcPlacing from '../components/WcPlacing';
import AtheleteData from '../components/AthleteData';
import { usePersonBy } from '../hooks/dataHooks';
import Spacer from '../components/Spacer';
import { Divider } from 'react-native-paper';

const data = require('../data/athelete-details.json');

export default function AtheleteDetailScreen({ navigation, route }) {
  console.log(route.params);

  const { data, refetch } = usePersonBy(route.params?.data?.PersonId);

  if (!data) {
    return null;
  }

  return (
    <ScrollView>
      <AtheleteInfo data={data} />
      <Spacer size={24} />
      <WcPlacing data={data} />
    </ScrollView>
  );
}
