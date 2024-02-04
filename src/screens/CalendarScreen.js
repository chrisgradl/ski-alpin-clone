import { useEffect, useMemo } from 'react';
import { FlatList } from 'react-native';

import { getIndexOfNextEvent } from '../Util';
import EventItem from '../components/EventItem';
import { useEvents } from '../hooks/dataHooks';

const mapEvents = (data) =>
  data.flatMap((d) => d.DayGroups).flatMap((dg) => dg.SportEventItems);

export default function CalendarScreen() {
  const { refetch, error, data } = useEvents({ select: mapEvents });

  const initialScrollIndex = useMemo(() => getIndexOfNextEvent(data), [data]);

  if (!data) {
    return null;
  }

  return (
    <FlatList
      getItemLayout={(d, index) => ({
        index,
        length: 176,
        offset: 176 * index,
      })}
      initialScrollIndex={initialScrollIndex}
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={({ item }) => <EventItem item={item} />}
    />
  );
}
