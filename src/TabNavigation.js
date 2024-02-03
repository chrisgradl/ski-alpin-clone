import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CupRankingsScreen from './screens/CupRankingsScreen';
import RankingsDetailScreen from './screens/RankingsDetailScreen';
import AtheleteDetailScreen from './screens/AtheleteDetailScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import TVScreen from './screens/TVScreen';
import CalendarScreen from './screens/CalendarScreen';
import * as React from 'react';
import StoryDetailScreen from './screens/StoryDetailScreen';

const Tab = createBottomTabNavigator();

const RankingsStack = createNativeStackNavigator();

function RankingsStackNavigator() {
  return (
    <RankingsStack.Navigator>
      <RankingsStack.Screen
        name="RankingsScreen"
        component={CupRankingsScreen}
      />
      <RankingsStack.Screen
        name="RankingsDetail"
        component={RankingsDetailScreen}
      />
      <RankingsStack.Screen
        name="AtheleteDetail"
        component={AtheleteDetailScreen}
      />
    </RankingsStack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackNavigator({ navigation, route }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{
          title: '',
          headerLeft: (props) => (
            <Ionicons
              onPress={() => navigation.navigate('Settings')}
              name="settings-sharp"
              size={20}
              color={props.tintColor}
            />
          ),
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <HomeStack.Screen
        name="StoryDetailScreen"
        options={({ route }) => ({
          title: route.params?.story?.Title ?? '',
        })}
        component={StoryDetailScreen}
      />
    </HomeStack.Navigator>
  );
}

const TVStack = createNativeStackNavigator();

function TVStackNavigator() {
  return (
    <TVStack.Navigator>
      <TVStack.Screen name="TVScreen" component={TVScreen} />
    </TVStack.Navigator>
  );
}

const CalendarStack = createNativeStackNavigator();

function CalendarStackNavigator() {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen name="CalendarScreen" component={CalendarScreen} />
    </CalendarStack.Navigator>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'Rankings') {
            iconName = focused ? 'list-sharp' : 'list-outline';
          } else if (route.name === 'TV') {
            iconName = focused ? 'tv-sharp' : 'tv-outline';
          } else if (route.name === 'Calendar') {
            iconName = focused ? 'calendar-sharp' : 'calendar-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarTestID: `tabBar-${route.name}`,
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Rankings" component={RankingsStackNavigator} />
      <Tab.Screen name="TV" component={TVStackNavigator} />
      <Tab.Screen name="Calendar" component={CalendarStackNavigator} />
    </Tab.Navigator>
  );
}
