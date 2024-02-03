import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Dimensions,
  Text,
} from 'react-native';
import { Paragraph, Subheading, Title } from 'react-native-paper';
import { Colors } from '../StyleConfig';

function VideoHeader() {
  return (
    <View
      style={{
        backgroundColor: 'black',
        flexDirection: 'row',
        paddingHorizontal: 4,
      }}
    >
      <Paragraph style={{ color: 'white', fontWeight: 'bold', flex: 1 }}>
        VIDEOS
      </Paragraph>
      <Paragraph style={{ color: 'white' }}>
        Ski Alpin in der ORF TVTHEK
      </Paragraph>
    </View>
  );
}

const itemWidth = Dimensions.get('screen').width / 2.5;

function VideoItem({ uri, title }) {
  return (
    <View
      style={{
        width: itemWidth,
        backgroundColor: Colors.tvSliderBackground,
        marginRight: 8,
      }}
    >
      <Image
        source={{
          uri,
        }}
        style={{ width: itemWidth, height: 100 }}
      />
      <Subheading numberOfLines={3} style={{ padding: 4, color: 'white' }}>
        {title}
      </Subheading>
    </View>
  );
}

export default function VideoSlider({ TvthekData }) {
  const items = TvthekData?.TvThekEpisodes;

  return (
    <>
      <VideoHeader />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          {items?.map((item, index) => (
            <VideoItem
              key={index}
              uri={item.ImageUrlSmall}
              title={item.TeaserTitle}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
