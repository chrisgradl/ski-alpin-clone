import React, { useMemo } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import { getIndexOfNextEvent } from '../Util';
import ErrorBanner from '../components/ErrorBanner';
import EventItem from '../components/EventItem';
import { useEvents } from '../hooks/dataHooks';
import { useRefreshByUser } from '../hooks/useRefreshByUser';

const mapEvents = (data) =>
  data.flatMap((d) => d.DayGroups).flatMap((dg) => dg.SportEventItems);

export default function CalendarScreen() {
  const { refetch, error, data, isPending } = useEvents({ select: mapEvents });

  const initialScrollIndex = useMemo(() => getIndexOfNextEvent(data), [data]);

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  if (error) {
    return <ErrorBanner onPress={refetch} visible={error} />;
  }

  return (
    <FlatList
      getItemLayout={(d, index) => ({
        index,
        length: 176,
        offset: 176 * index,
      })}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser || isPending}
          onRefresh={refetchByUser}
        />
      }
      initialScrollIndex={initialScrollIndex}
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={({ item }) => <EventItem item={item} />}
    />
  );
}
