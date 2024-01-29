import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

function ResultsGroup({ item }) {
  return (
    <View>
      <Text>{item.GroupName}</Text>
      <View style={{ flexDirection: 'row' }}>
        {item.PersonResults.map((i) => (
          <Text> {i.LocationName} </Text>
        ))}
      </View>

      <View style={{ flexDirection: 'row' }}>
        {item.PersonResults.map((i) => (
          <Text> {i.Rank} </Text>
        ))}
      </View>

      <View style={{ flexDirection: 'row' }}>
        {item.PersonResults.map((i) => (
          <Text> {i.EventDate} </Text>
        ))}
      </View>
    </View>
  );
}

export default function WcPlacing({ data }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headline}>LETZTE DREI WELTCUP PLATZIERUNGEN</Text>

      <Text style={{ textAlign: 'center' }}>
        {data.PersonResultGroups.map((item) => (
          <ResultsGroup item={item} />
        ))}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  eventname: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  placing: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  headline: {
    margin: 24,
    fontSize: 18,
    backgroundColor: 'blue',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  event: {
    margin: 24,
    fontSize: 18,
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
