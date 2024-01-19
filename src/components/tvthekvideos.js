import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { Card } from 'react-native-paper';

export default function Tvthek({TvthekData}) {

const items = TvthekData.TvThekEpisodes;

  return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          {items.map((item, index) => (
            <Card key={index} style={styles.card}>
              <Card.Cover source={{ uri: item.ImageUrlSmall }} />
              <Card.Content>
                <Text style={styles.title}>{item.TeaserTitle}</Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    width: 150,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    marginTop: 5,
  },
});
