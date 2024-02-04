import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Card, Paragraph, Surface } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

const CupRankingItem = ({ cup, color, onPress }) => {
  if (!cup) {
    return null;
  }

  return (
    <Pressable testID={`ranking-item-${cup.CupRankingId}`} onPress={onPress}>
      <Surface
        mode="flat"
        style={{
          marginHorizontal: 16,
          alignItems: 'center',
          flexDirection: 'row',
          borderRadius: 10,
          marginBottom: 6,
          padding: 16,
        }}
      >
        <Paragraph style={{ fontWeight: 'bold', color, flex: 1 }}>
          {cup.CupRankingName}
        </Paragraph>
        <Ionicons name="chevron-forward-outline" size={20} color="grey" />
      </Surface>
    </Pressable>
  );
};

export default CupRankingItem;
