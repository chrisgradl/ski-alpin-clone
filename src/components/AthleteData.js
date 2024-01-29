import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

export default function AtheleteData({ data }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        {data.FirstName} {data.LastName}
      </Text>

      <Text style={styles.paragraph}>Geb: {data.BirthDay}</Text>

      <Text style={styles.text}>{data.Age} Jahre</Text>

      <Text style={styles.text}>{data.BirthPlace}</Text>

      <Text style={styles.paragraph}>
        Weltcup: {data.WcRank}. Platz / {data.WcPoints} Punkte
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
    fontSize: 15,
    fontWeight: 'normal',
    textAlign: 'left',
  },
  text: {
    margin: 24,
    fontSize: 15,
    fontWeight: 'normal',
    textAlign: 'center',
  },
});
