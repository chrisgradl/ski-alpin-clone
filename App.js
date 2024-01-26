import * as React from 'react';
import * as Linking from 'expo-linking';
import { Alert, Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {DefaultTheme, Link, NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import RankingsDetailScreen from './src/screens/RankingsDetailScreen';
import TVScreen from './src/screens/TVScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import AtheleteDetailScreen from './src/screens/AtheleteDetailScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import CupRankingsScreen from './src/screens/CupRankingsScreen';



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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
      <RankingsStack.Screen name="RankingsScreen" component={CupRankingsScreen}/>
      <RankingsStack.Screen name="RankingsDetail" component={RankingsDetailScreen}/>
      <RankingsStack.Screen name="AtheleteDetail" component={AtheleteDetailScreen}/>
    </RankingsStack.Navigator>
  )
}

const HomeStack = createNativeStackNavigator();
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen}/>
    </HomeStack.Navigator>
  )
}

const TVStack = createNativeStackNavigator();
function TVStackNavigator() {
  return (
    <TVStack.Navigator>
      <TVStack.Screen name="TVScreen" component={TVScreen}/>
    </TVStack.Navigator>
  )
}

const CalendarStack = createNativeStackNavigator();
function CalendarStackNavigator() {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen name="CalendarScreen" component={CalendarScreen}/>
    </CalendarStack.Navigator>
  )
}

const rankingsDeeplink = `skialpine://Rankings/RankingsDetail?CupRankingId=5`
const tvDeeplink = `skialpine://TV`

const queryClient = new QueryClient({defaultOptions: {queries: {retry: false}}})

const linking = {
  prefixes: ["skialpine://"],
  config: {
    /* configuration for matching screens with paths */
  },
  async getInitialURL() {
    // Check if app was opened from a deep link
    const url = await Linking.getInitialURL();

    if (url != null) {
      return url;
    }

    // Check if there is an initial firebase notification
    const message = await Notifications.getLastNotificationResponseAsync();
    console.log(message)

    // Get the `url` property from the notification which corresponds to a screen
    // This property needs to be set on the notification payload when sending it
    return message?.data?.url;
  },
};

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    try {
      const firebaseToken = await Notifications.getDevicePushTokenAsync();
      console.log(firebaseToken);
    } catch (e) {
      console.log(e)
    }

    // token = await Notifications.getExpoPushTokenAsync({
    //   projectId: Constants.expoConfig.extra.eas.projectId,
    // });


  } else {
    alert('Must use physical device for Push Notifications');
  }
}

export default function App() {

  const [expoPushToken, setExpoPushToken] = React.useState('');
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  React.useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      Alert.alert(JSON.stringify(notification));
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
      Alert.alert(JSON.stringify(notification));
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer linking={linking} theme={MyTheme}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
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
              return <Ionicons name={iconName} size={size} color={color}/>;
            },
            headerShown: false,
            tabBarInactiveTintColor: '#D2EDF4',
          })}
        >
          <Tab.Screen name="Home" component={HomeStackNavigator}/>
          <Tab.Screen name="Rankings" component={RankingsStackNavigator}/>
          <Tab.Screen name="TV" component={TVStackNavigator}/>
          <Tab.Screen name="Calendar" component={CalendarStackNavigator}/>
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
