import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as React from 'react';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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

export default function usePushNotifications() {
  const notificationListener = React.useRef();
  const responseListener = React.useRef();
  const [notification, setNotification] = React.useState();

  React.useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => console.log(token))
      .catch((e) => console.log(e));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
}
