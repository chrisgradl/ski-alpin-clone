import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Button,
  ActivityIndicator,
} from 'react-native';

import SiteHeader from '../components/SiteHeader';
import Stories from '../components/Stories';
import VideoSlider from '../components/VideoSlider';
import { useStories, useTVThek } from '../hooks/dataHooks';
import Spacer from '../components/Spacer';

export default function HomeScreen() {
  const { data, isPending, error, refetch } = useStories();
  const { data: tvthekData } = useTVThek();

  if (isPending) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>Error Loading Data: {error.message}</Text>
        <Button title="try again" onPress={refetch} />
      </View>
    );
  }

  if (!data) {
    return null;
  }

  const [mainStory, second, third, ...restStories] = data.MainStories;
  return (
    <ScrollView>
      <SiteHeader story={mainStory} />
      <Spacer />
      <Stories stories={[second, third]} />
      <Spacer />
      <VideoSlider TvthekData={tvthekData} />
      <Spacer />
      <Stories stories={restStories} />
      <Spacer />
    </ScrollView>
  );
}
