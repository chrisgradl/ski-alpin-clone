import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {
  Caption,
  Card,
  Paragraph,
  Subheading,
  Title,
  useTheme,
} from 'react-native-paper';
import { formatTime } from "../Util";

export default function TVItem({ item }) {
  const {
    colors: { primary, onPrimary },
  } = useTheme();

  return (
    <Card disabled={item.ScheduleState === 'Canceled'} style={{ margin: 12, marginVertical: 6, padding: 12 }}>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <Paragraph>{item.SportEventBaseInfo.CompetitionName}</Paragraph>
      </View>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Image
            style={{ width: 30, aspectRatio: 1, resizeMode: 'contain' }}
            source={{ uri: item.SportEventBaseInfo.LocationNationImage }}
          />
          <Caption>{item.SportEventBaseInfo.LocationName}</Caption>
        </View>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View style={[styles.timeCircle, { backgroundColor: primary }]}>
            <Paragraph style={{ color: onPrimary }}>
              {formatTime(item.StartBC)}
            </Paragraph>
          </View>
        </View>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Image style={styles.image} source={{ uri: item.ChannelImagePath }} />
        </View>
      </View>

      <View style={styles.textContainer}>
        <Title style={{ fontWeight: 'bold', textAlign: 'center' }}>
          {item.Title}
        </Title>
        <Subheading>
          Start: {formatTime(item.SportEventBaseInfo.EventDate)}
        </Subheading>
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
