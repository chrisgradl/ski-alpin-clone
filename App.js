import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Device from 'expo-device';
import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';
import * as React from 'react';
import { Platform } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import { CombinedDarkTheme, CombinedDefaultTheme } from './src/AppTheming';
import { PreferencesContext } from './src/context/PreferencesContext';
import SettingsScreen from './src/screens/SettingsScreen';
import TabNavigator from './src/TabNavigation';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const RootStack = createNativeStackNavigator();

const rankingsDeeplink = `skialpine://Rankings/RankingsDetail?CupRankingId=5`;
const tvDeeplink = `skialpine://TV`;

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const linking = {
  prefixes: ['skialpine://'],
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
    console.log(message);

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
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      //alert('Failed to get push token for push notification!');
      return;
    }

    try {
      const firebaseToken = await Notifications.getDevicePushTokenAsync();
      console.log(firebaseToken);
    } catch (e) {
      console.log(e);
    }

    // token = await Notifications.getExpoPushTokenAsync({
    //   projectId: Constants.expoConfig.extra.eas.projectId,
    // });
  } else {
    // alert('Must use physical device for Push Notifications');
  }
}

export default function App() {
  const notificationListener = React.useRef();
  const responseListener = React.useRef();
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;
  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  React.useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => console.log(token))
      .catch((e) => console.log(e));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        //Alert.alert(JSON.stringify(notification));
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
        //Alert.alert(JSON.stringify(notification));
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <PreferencesContext.Provider value={preferences}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={theme}>
          <NavigationContainer linking={linking} theme={theme}>
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
          </NavigationContainer>
        </PaperProvider>
      </QueryClientProvider>
    </PreferencesContext.Provider>
  );
}
