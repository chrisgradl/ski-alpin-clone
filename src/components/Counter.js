import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export const Counter = ({ initialValue = 0 }) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={increment} accessibilityLabel="Increment">
          <Text>+</Text>
        </TouchableOpacity>
        <Text accessibilityLabel="counterValue">{count}</Text>
        <TouchableOpacity onPress={decrement} accessibilityLabel="Decrement">
          <Text>-</Text>
        </TouchableOpacity>
      </View>
      {count < 0 && (
        <Text accessibilityLabel="Info Message">Value is lower than 0</Text>
      )}
    </View>
  );
};
