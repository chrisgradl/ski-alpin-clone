import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Paragraph, useTheme } from "react-native-paper";

const personPicSize = 60;
const flagPicWidth = 25;

export function CountryInfo({ data }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        verticalAlign: 'center',
      }}
    >
      <View style={{ flex: 1, verticalAlign: 'center' }}>
        <View style={styles.picFrame}>
          <Image style={styles.flagPic} source={{ uri: data.NationImage }} />
        </View>
      </View>
      <View style={{ flex: 1, verticalAlign: 'center' }}>
        <Paragraph style={styles.flagName}>{data.NationCC3}</Paragraph>
      </View>
    </View>
  );
}

export default function WCRanking({ data }) {
  const navigation = useNavigation();

  const {
    colors: { surface, surfaceVariant },
  } = useTheme();

  return (
    <View>
      <Text style={styles.titleText}>{data.RankingDescription}</Text>
      <ScrollView>
        {data.PersonRankings.map((i, index) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('AtheleteDetail', { data: i })}
            style={{
              flexDirection: 'row',
              backgroundColor: index % 2 == 1 ? surfaceVariant : surface,
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <View
              style={{
                flex: 2,
                justifyContent: 'center',
              }}
            >
              <Paragraph style={styles.rankText}>{i.Rank}.</Paragraph>
            </View>
            <View style={{ flex: 6 }}>
              <View style={{ flexDirection: 'column' }}>
                <View style={{ flex: 5 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 3, paddingTop: 35 }}>
                      <CountryInfo data={i} />
                    </View>

                    <View style={{ flex: 3 /*, backgroundColor: 'red'*/ }}>
                      <View style={styles.picFrame}>
                        <Image
                          style={styles.personPic}
                          source={{ uri: i.PersonImage }}
                        />
                      </View>
                    </View>

                    <View
                      style={{ flex: 3 /*, backgroundColor: 'red'*/ }}
                    ></View>
                  </View>
                </View>

                <View style={{ flex: 2 /*, backgroundColor: 'red'*/ }}>
                  <Paragraph style={styles.nameText}>
                    {i.FirstName}{' '}
                    <Text style={{ fontWeight: 'bold' }}>{i.LastName}</Text>
                  </Paragraph>
                </View>
              </View>
            </View>

            <View style={{ flex: 2, justifyContent: 'center' }}>
              <Paragraph style={styles.valueText}>{i.Value}</Paragraph>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#376191',
    padding: 20,
  },
  titleText: {
    color: '#FFFFFF',
    paddingVertical: 2,
    backgroundColor: '#376191',
    //padding: 2,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    verticalAlign: 'center',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  rankText: {
    lineHeight: 30,
    //padding: 2,
    fontSize: 30,
    //fontWeight: 'bold',
    textAlign: 'center',
    verticalAlign: 'center',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  valueText: {
    margin: 2,
    //padding: 2,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    verticalAlign: 'center',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  nameText: {
    //margin: 2,
    //padding: 2,
    fontSize: 18,
    //fontWeight: 'bold',
    textAlign: 'center',
    verticalAlign: 'center',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  flagName: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    //margin: 2,
    //padding: 2,
    fontSize: 18,
    //fontWeight: 'bold',
    textAlign: 'center',
    verticalAlign: 'center',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  flagPic: {
    //Originalgroeße 256*170
    width: flagPicWidth,
    height: (170 * flagPicWidth) / 256,
  },
  personPic: {
    //Originalgroeße 256*256
    width: personPicSize,
    height: personPicSize,
    borderRadius: personPicSize,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#439AFF',
  },
  picFrame: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableRow: {
    //flexDirection: "row",
    //height: 40,
    //alignItems:"center",
  },
});
