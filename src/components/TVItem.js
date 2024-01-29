import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card } from 'react-native-paper';

export default function TVItem({ item }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.textContainer}>
          <View style={styles.timeCircle}>
            <Text style={styles.subtitle}>{formatTime(item.StartBC)}</Text>
          </View>
          <Text style={styles.title}>{item.Title}</Text>
        </View>
        <Image style={styles.image} source={{ uri: item.ChannelImagePath }} />
      </Card.Content>
    </Card>
  );
}

// Hilfsfunktion zum Formatieren der Uhrzeit
const formatTime = (timeString) => {
  const date = new Date(timeString);
  return date.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 5,
  },
  image: {
    width: '30%',
    height: 19,
    resizeMode: 'cover',
    marginTop: 4,
  },
  croupDescription: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'darkblue',
    color: 'white',
    alignItems: 'center',
  },
  timeCircle: {
    width: 40,
    height: 40,
    borderRadius: 25, // Halbe Breite und Höhe für einen Kreis
    backgroundColor: 'darkblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'white', // Textfarbe im Kreis
  },
});
