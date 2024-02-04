import { SectionList, View } from 'react-native';
import { Subheading, useTheme } from 'react-native-paper';

import Spacer from '../components/Spacer';
import TVItem from '../components/TVItem';
import { useTVStreams } from '../hooks/dataHooks';

const mapEvents = (d) => d.map((d) => ({ ...d, data: d.DayGroups }));

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
        <TVItem item={i} key={i} />
      ))}
      <Spacer />
    </>
  );
}

export default function TVScreen() {
  const { refetch, error, isPending, data } = useTVStreams();

  if (!data) {
    return null;
  }

  const flatData = mapEvents(data);

  return (
    <SectionList
      sections={flatData}
      renderSectionHeader={({ section }) => (
        <SectionHeader title={section.GroupDescription} />
      )}
      renderItem={({ item }) => <SectionItem item={item} />}
    />
  );
}
