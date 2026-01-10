import * as Linking from 'expo-linking';
import * as Notifications from 'expo-notifications';

const LinkingConfig = {
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
    // Get the `url` property from the notification which corresponds to a screen
    // This property needs to be set on the notification payload when sending it
    return message?.data?.url;
  },
};

export { LinkingConfig };
