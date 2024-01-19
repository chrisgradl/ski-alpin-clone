import {ScrollView} from 'react-native';
import SiteHeader from '../components/SiteHeader';
import Tvthek from '../components/tvthekvideos';
import Stories from '../components/Stories';

const storiesData = require('../data/stories.json');
const TvthekData = require('../data/tvthek-videos.json');

export default function HomeScreen() {
  return (
    <ScrollView>
      <SiteHeader storiesData={storiesData}/>
      <Tvthek TvthekData={TvthekData}/>
      <Stories storiesData={storiesData}/>
    </ScrollView>
  );
}
