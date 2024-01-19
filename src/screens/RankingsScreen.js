import {Button, Text, View} from 'react-native';
import WCRanking from '../components/WCRanking';

const data = require('../data/ranking-slalom.json')

export default function RankingsScreen({navigation, route}) {
  return (
    <>
      <WCRanking data={data}/>
    </>
  );
}
