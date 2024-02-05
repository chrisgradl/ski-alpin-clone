import * as React from 'react';
import { Image } from 'react-native';
import { Banner, Icon } from 'react-native-paper';

const ErrorBanner = ({ onPress, visible = false }) => {
  return (
    <Banner
      visible={visible}
      actions={[
        {
          label: 'Neu Laden',
          onPress,
        },
      ]}
      icon={({ size }) => <Icon size={size} source="information-outline" />}
    >
      Beim Laden der Daten ist ein Fehler aufgetreten. Bitte überprüfe deine
      Internetverbindung und versuche es erneut.
    </Banner>
  );
};

export default ErrorBanner;
