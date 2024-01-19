import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import AtheletePicture from '../components/AthletePicture';
import WCRanking from '../components/WCRanking';
import WcPlacing from '../components/WcPlacing';
import AtheleteData from '../components/AthleteData';


const data = require('../data/athelete-details.json');

export default function AtheleteDetailScreen ({ navigation, route }) {


  const { data } = route.params;

  return (
    <ScrollView>
      <AtheletePicture data={data} />
      <AtheleteData data={data}/>
      {/*<WcPlacing data={data}/>*/}
    </ScrollView>
  );
};
