import { View, StyleSheet, Image } from 'react-native';

export default function AtheletePicture() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={{uri: 'https://appfeeds.orf.at/alpine.v2/static/images/people/6354.jpg?v=202401081548'}} />
      <Image style={styles.country} source={{uri: 'https://appfeeds.orf.at/alpine.v2/static/images/nations/USA.png?v=20180212'}} />
    </View>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  logo: {
    height: 128,
    width: 128,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

    country: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 32,
    width: 32,
  }
});