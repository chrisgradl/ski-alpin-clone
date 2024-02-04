import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  Caption,
  Card,
  Paragraph,
  Subheading,
  Title,
  useTheme,
} from 'react-native-paper';

import { formatDate, formatDateWithCurrentDay, formatTime } from "../Util";


function EventItem({ item }) {
  return (
    <Card style={{ margin: 12, marginVertical: 6, padding: 12 }}>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <Paragraph>{formatDateWithCurrentDay(item.EventDate)}</Paragraph>
      </View>
      <View style={styles.textContainer}>
        <Title style={{ fontWeight: 'bold', textAlign: 'center' }}>
          {item.SportEventDescription}
        </Title>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Image
            style={{ width: 30, aspectRatio: 1, resizeMode: 'contain' }}
            source={{ uri: item.LocationNationImage }}
          />
          <Caption>{item.LocationName}</Caption>
        </View>
        <Subheading>Start: {formatTime(item.EventDate)}</Subheading>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  textContainer: {
    alignItems: 'center',
    paddingBottom: 12,
  },
  image: {
    aspectRatio: 1,
    width: 65,
    resizeMode: 'contain',
  },
  timeCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EventItem;
