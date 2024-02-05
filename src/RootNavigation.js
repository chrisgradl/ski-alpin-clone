import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import TabNavigator from './TabNavigation';
import SettingsScreen from './screens/SettingsScreen';

const RootStack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <RootStack.Navigator>
      <RootStack.Group screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Tab" component={TabNavigator} />
      </RootStack.Group>
      <RootStack.Group
        screenOptions={{
          presentation: 'modal',
          title: 'Einstellungen',
        }}
      >
        <RootStack.Screen name="Settings" component={SettingsScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}
