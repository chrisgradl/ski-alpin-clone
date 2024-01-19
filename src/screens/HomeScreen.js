import React from 'react';
import {Alert, ScrollView, View, Text, Button, ActivityIndicator} from 'react-native';
import SiteHeader from '../components/SiteHeader';
import Tvthek from '../components/tvthekvideos';
import Stories from '../components/Stories';
import { useQuery } from '@tanstack/react-query';

const storiesData = require('../data/stories.json');
const TvthekData = require('../data/tvthek-videos.json');


const storiesUrl = 'https://appfeeds.orf.at/alpine.v2/api/sporton?osType=1'

function fetchStories() {
  return fetch(storiesUrl).then(res => res.json());
}

export default function HomeScreen() {

  const { data, isPending, error, refetch } = useQuery({ queryKey: ['storiesData'], queryFn: fetchStories})

  if (isPending) {
    return <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator size="large" /></View>
  }

  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>Error Loading Data</Text>
        <Button title="try again" onPress={refetch} />
      </View>
    );
  }

  if (!data) {
    return null;
  }


  return (
    <ScrollView>
      <SiteHeader storiesData={data}/>
      <Tvthek TvthekData={TvthekData}/>
      <Stories storiesData={data}/>
    </ScrollView>
  );
}
