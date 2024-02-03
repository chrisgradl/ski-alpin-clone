import React from 'react';
import { ImageBackground, Pressable, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import { Colors } from '../StyleConfig';
import { DefaultTheme, useNavigation } from '@react-navigation/native';

export default function SiteHeader({ story }) {
  const navigation = useNavigation();
  if (!story) {
    return null;
  }
  const firstTitle = story?.Title;
  const imageUrl = story?.Image?.src;

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('StoryDetailScreen', { story })
      }
    >
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="center"
      >
        <Title style={styles.text}>{firstTitle}</Title>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 'auto',
    height: 200,
  },
  text: {
    color: DefaultTheme.textColor,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 0,
    right: 10,
    left: 10,
  },
});
