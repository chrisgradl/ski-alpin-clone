import React from 'react';
import { ScrollView, View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

import { Colors } from '../StyleConfig';
import CupRankingItem from '../components/CupRankingItem';
import ErrorBanner from '../components/ErrorBanner';
import LoadingView from '../components/LoadingView';
import Spacer from '../components/Spacer';
import { useCupRankingsByGender } from '../hooks/dataHooks';

function CupRankingsScreen({ navigation, route }) {
  const [gender, setGender] = React.useState('female');
  const { data, refetch, isPending, error } = useCupRankingsByGender(
    gender === 'female' ? 2 : 1,
  );

  const onPress = (cup) => {
    navigation.navigate('RankingsDetail', { cup });
  };

  React.useEffect(() => {
    refetch();
  }, [gender, refetch()]);

  const nationsCup = data?.find((s) => s.CupRankingId === 1);

  if (isPending) {
    return <LoadingView />;
  }

  if (error) {
    return <ErrorBanner onPress={refetch} visible={error} />;
  }

  return (
    <View style={{ flex: 1, paddingVertical: 16 }}>
      <ScrollView>
        {data
          ?.filter((s) => s.CupRankingId !== 1)
          .map((cup) => (
            <CupRankingItem
              key={cup.CupRankingId}
              onPress={() => onPress(cup)}
              cup={cup}
              color={
                gender === 'female'
                  ? Colors.femaleHighlight
                  : Colors.maleHighlight
              }
            />
          ))}
        <Spacer size={24} />
        <CupRankingItem
          onPress={() => onPress(nationsCup)}
          cup={nationsCup}
          color={
            gender === 'female' ? Colors.femaleHighlight : Colors.maleHighlight
          }
        />
      </ScrollView>
      <SegmentedButtons
        style={{ marginHorizontal: 16 }}
        value={gender}
        onValueChange={setGender}
        buttons={[
          {
            testID: 'segment-female',
            value: 'female',
            label: 'DAMEN',
            checkedColor: Colors.femaleHighlight,
          },
          {
            testID: 'segment-male',
            value: 'male',
            label: 'HERREN',
            checkedColor: Colors.maleHighlight,
          },
        ]}
      />
    </View>
  );
}

export default CupRankingsScreen;
