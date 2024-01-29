import { ScrollView, Text, View } from 'react-native';
import { useTVStreams } from '../hooks/dataHooks';
import TVItem from '../components/TVItem';

const flatMapEvents = (data) =>
  data.flatMap((i) => i.DayGroups.flatMap((d) => d.Items));

export default function TVScreen() {
  const { refetch, error, isPending, data } = useTVStreams();

  if (!data) {
    return null;
  }

  const flatData = flatMapEvents(data);

  return (
    <ScrollView>
      {flatData.map((d) => (
        <TVItem key={d.Id} item={d} />
      ))}
    </ScrollView>
  );
}
