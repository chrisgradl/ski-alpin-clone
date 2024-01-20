import { Text, SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';
import { Card } from 'react-native-paper';

export default function Stories({storiesData}) {

  const items = storiesData?.MainStories?.slice(1);

  return (
      <View style={styles.container}>
        {items.map((item, index) => (
          <Card key={index} style={styles.card}>
            <Card.Cover source={{ uri: item.Image.src }} />
            <Card.Content>
              <Text style={styles.title}>{item.Title}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    width: '45%',
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    marginTop: 5,
  },
});
