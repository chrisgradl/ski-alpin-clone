import { View, StyleSheet, Image } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';

import { formatDate } from '../Util';

export default function AtheleteInfo({ data }) {
  const {
    colors: { primary },
  } = useTheme();

  console.log(data);

  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 12,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexDirection: 'row',
          }}
        >
          <Image
            style={styles.country}
            source={{
              uri: data.NationImage,
            }}
          />
          <Paragraph>{data.NationName}</Paragraph>
        </View>
        <View style={{ flex: 2, alignItems: 'center' }}>
          <Image
            style={[styles.logo, { borderColor: primary }]}
            source={{
              uri: data.PersonImage,
            }}
          />
          <Paragraph>
            {data.FirstName}{' '}
            <Paragraph style={{ fontWeight: 'bold' }}>
              {data.LastName}
            </Paragraph>
          </Paragraph>
        </View>
        <View style={{ flex: 1 }} />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Paragraph>
          Weltcup: {data.WcRank} Platz / {data.WcPoints} Punkte
        </Paragraph>
        <Paragraph>Geb: {formatDate(data.BirthDay)}</Paragraph>
        <Paragraph>Alter: {data.Age}</Paragraph>
        <Paragraph>{data.BirthPlace}</Paragraph>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoWrapper: {
    position: 'absolute', // Position the image absolutely to center it in the parent
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    aspectRatio: 1,
    height: 128,
    borderRadius: 128,
    overflow: 'hidden',
    borderWidth: 3,
  },
  country: {
    width: 30,
    aspectRatio: 1,
    resizeMode: 'contain',
    marginRight: 8,
  },
});
