import React from 'react';
import {StyleSheet, ScrollView, Text, View, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const personPicSize = 60;
const flagPicWidth = 25;

export default function WCRanking({data}) {

  const navigation = useNavigation();

  return (
    <View>
      <Text style={styles.titleText}>
        {data.RankingDescription}
      </Text>
      <ScrollView>
        {data.PersonRankings.map((i, index) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('AtheleteDetail', { data: i })}
            style={{
            flexDirection: 'row',
            backgroundColor: index % 2 == 1 ? '#E9F8FB' : 'white',
            paddingTop: 10,
            paddingBottom: 10,
          }}>
            <View style={{flex: 2, justifyContent: 'center' /*, backgroundColor: 'red'*/}}>
              <Text style={styles.rankText}>
                {i.Rank}.
              </Text>
            </View>
            <View style={{flex: 6 /*, backgroundColor: 'red'*/}}>

              <View style={{flexDirection: 'column'}}>
                <View style={{flex: 5 /*, backgroundColor: 'red'*/}}>

                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 3, paddingTop: 35}}>

                      <View style={{flexDirection: 'row', verticalAlign: 'center'}}>

                        <View style={{flex: 1, verticalAlign: 'center'}}>
                          <View style={styles.picFrame}>
                            <Image style={styles.flagPic} source={{uri: i.NationImage}}/>
                          </View>
                        </View>
                        <View style={{flex: 1, verticalAlign: 'center'}}>
                          <Text style={styles.flagName}>
                            {i.NationCC3}
                          </Text>
                        </View>

                      </View>


                    </View>

                    <View style={{flex: 3 /*, backgroundColor: 'red'*/}}>
                      <View style={styles.picFrame}>
                        <Image style={styles.personPic} source={{uri: i.PersonImage}}/>
                      </View>
                    </View>

                    <View style={{flex: 3 /*, backgroundColor: 'red'*/}}>

                    </View>
                  </View>
                </View>


                <View style={{flex: 2 /*, backgroundColor: 'red'*/}}>
                  <Text style={styles.nameText}>
                    {i.FirstName} <Text style={{fontWeight: 'bold'}}>{i.LastName}</Text>
                  </Text>
                </View>
              </View>

            </View>

            <View style={{flex: 2, justifyContent: 'center'}}>
              <Text style={styles.valueText}>
                {i.Value}
              </Text>
            </View>
          </TouchableOpacity>))}
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
    color: '#808080',
    margin: 2,
    //padding: 2,
    fontSize: 32,
    //fontWeight: 'bold',
    textAlign: 'center',
    verticalAlign: 'center',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  valueText: {
    color: '#808080',
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
    color: '#00204B',
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
    color: '#00204B',
    //margin: 2,
    //padding: 2,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    verticalAlign: 'center',
    //alignItems: 'center',
    //justifyContent: 'center',
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
    height: 170 * flagPicWidth / 256,
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
