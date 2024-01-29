import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import { Colors } from '../StyleConfig';

export default function SiteHeader({ story }) {
  if (!story) {
    return null;
  }
  const firstTitle = story?.Title;
  const imageUrl = story?.Image?.src;

  return (
    <ImageBackground
      source={{ uri: imageUrl }}
      style={styles.image}
      resizeMode="center"
    >
      <Title style={styles.text}>{firstTitle}</Title>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 'auto',
    height: 200,
  },
  text: {
    color: Colors.highlightColor,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 0,
    right: 10,
    left: 10,
  },
});
