import { RefreshControl, SectionList, View } from 'react-native';
import { Subheading, useTheme } from 'react-native-paper';

import Spacer from '../components/Spacer';
import TVItem from '../components/TVItem';
import { useTVStreams } from '../hooks/dataHooks';
import { useRefreshByUser } from '../hooks/useRefreshByUser';
import ErrorBanner from "../components/ErrorBanner";
import React from "react";

const mapEvents = (d) => d?.map((d) => ({ ...d, data: d?.DayGroups })) ?? [];

export function SectionHeader({ title, primaryColor = true }) {
  const {
    colors: { primary, onPrimary, secondary, onSecondary },
  } = useTheme();
  return (
    <View
      style={{
        backgroundColor: primaryColor ? primary : secondary,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Subheading style={{ color: primaryColor ? onPrimary : onSecondary }}>
        {title}
      </Subheading>
    </View>
  );
}

export function SectionItem({ item }) {
  return (
    <>
      <SectionHeader title={item.ProgramDateString} primaryColor={false} />
      {item.Items.map((i) => (
        <TVItem item={i} key={i.Id} />
      ))}
      <Spacer />
    </>
  );
}

export default function TVScreen() {
  const { refetch, error, isPending, data } = useTVStreams();
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  if (error) {
    return <ErrorBanner onPress={refetch} visible={error} />;
  }

  const flatData = mapEvents(data);

  return (
    <SectionList
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser || isPending}
          onRefresh={refetchByUser}
        />
      }
      sections={flatData}
      renderSectionHeader={({ section }) => (
        <SectionHeader title={section.GroupDescription} />
      )}
      renderItem={({ item }) => <SectionItem item={item} />}
    />
  );
}
