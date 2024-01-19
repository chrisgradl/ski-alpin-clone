import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Text, View} from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import RankingsScreen from './src/screens/RankingsScreen';
import TVScreen from './src/screens/TVScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import AtheleteDetailScreen from './src/screens/AtheleteDetailScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const Tab = createBottomTabNavigator();


function HeaderSettingsButton({tintColor}) {
  return <Ionicons name="settings-sharp" color={tintColor} onPress={() => {
  }}/>
}

const customTheme = {
  darkBlueColor: '#376191',
}

export {customTheme};

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#EFEFEF',
    card: '#27B6DE',
    primary: 'white',
    text: 'white',
  },
};

const RankingsStack = createNativeStackNavigator();

function RankingsStackNavigator() {
  return (
    <RankingsStack.Navigator>
      <RankingsStack.Screen name="Rankings" component={RankingsScreen}/>
      <RankingsStack.Screen name="AtheleteDetail" component={AtheleteDetailScreen}/>
    </RankingsStack.Navigator>
  )
}

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home-sharp' : 'home-outline';
              } else if (route.name === 'RankingsTab') {
                iconName = focused ? 'list-sharp' : 'list-outline';
              } else if (route.name === 'TV') {
                iconName = focused ? 'tv-sharp' : 'tv-outline';
              } else if (route.name === 'Calendar') {
                iconName = focused ? 'calendar-sharp' : 'calendar-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color}/>;
            },
            headerShown: false,
            tabBarInactiveTintColor: '#D2EDF4',
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen}/>
          <Tab.Screen name="RankingsTab" component={RankingsStackNavigator}/>
          <Tab.Screen name="TV" component={TVScreen}/>
          <Tab.Screen name="Calendar" component={TVScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
