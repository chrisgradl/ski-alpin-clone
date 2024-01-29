import { StyleSheet, View } from 'react-native';
import { Card } from 'react-native-paper';
import { Colors } from '../StyleConfig';

export default function Stories({ stories }) {
  return (
    <View style={styles.container}>
      {stories.map((item, index) => (
        <Card key={index} style={styles.card}>
          <Card.Cover source={{ uri: item.Image.src }} style={styles.image} />
          <Card.Title
            titleStyle={{ fontWeight: 'bold', color: Colors.highlightColor }}
            title={item.Title}
            titleNumberOfLines={3}
          />
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 12,
    columnGap: 12,
  },
  card: {
    height: 180,
    width: '48%',
  },
  image: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0, height: 100 },
});
