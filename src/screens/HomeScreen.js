import React from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';

import ErrorBanner from '../components/ErrorBanner';
import LoadingView from '../components/LoadingView';
import SiteHeader from '../components/SiteHeader';
import Spacer from '../components/Spacer';
import Stories from '../components/Stories';
import VideoSlider from '../components/VideoSlider';
import { useStories, useTVThek } from '../hooks/dataHooks';
import { useRefreshByUser } from '../hooks/useRefreshByUser';

export default function HomeScreen() {
  const { data, isPending, error, refetch } = useStories();
  const { data: tvthekData } = useTVThek();
  const { refetchByUser, isRefetchingByUser } = useRefreshByUser(refetch);

  if (isPending) {
    return <LoadingView />;
  }

  if (error) {
    return <ErrorBanner onPress={refetch} visible={error} />;
  }

  const [mainStory, second, third, ...restStories] = data?.MainStories;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
        />
      }
    >
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
