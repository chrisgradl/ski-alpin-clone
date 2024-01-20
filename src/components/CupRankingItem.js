import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

const CupRankingItem = ({ cup, color, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, marginBottom: 6, padding: 16}}>
      <Paragraph style={{fontWeight: 'bold', color, flex: 1 }}>{cup.CupRankingName}</Paragraph>
      <Ionicons name="chevron-forward-outline" size={20} color="grey" />
    </TouchableOpacity>
  );
};

export default CupRankingItem;
