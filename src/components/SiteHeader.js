import { Button, ScrollView, Switch, Text, Image, TextInput, StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

export default function SiteHeader({storiesData}) {
  
  const firstStory = storiesData.MainStories[0];
  const firstTitle = firstStory.Title;
  const imageUrl = firstStory.Image.src;
  
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="center"
      />
      <View style={styles.textView}>
        <Text style={styles.text}>{firstTitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: 360,
    height: 200,
  },
  textView: {
    position: 'relativ',
    left: 0,
    bottom: 30,
    maxWidth: 100,
    flexWrap: 'wrap'
  },
  text: {
    color: 'darkblue', 
    fontSize: 20,
  },
});
