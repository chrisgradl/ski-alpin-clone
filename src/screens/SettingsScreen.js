import React from 'react';
import { View } from 'react-native';
import { Divider, List, Switch } from 'react-native-paper';
import { PreferencesContext } from '../context/PreferencesContext';

const SettingsScreen = () => {
  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);
  return (
    <>
      <List.Item
        title="Dark Theme"
        right={() => <Switch value={isThemeDark} onValueChange={toggleTheme} />}
      />
      <Divider />
      <List.Item title="Push Mitteilungen" right={() => <Switch />} />
      <Divider />
      <List.Item
        title="Impressum"
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />
      <List.Item
        title="Datenschutz"
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
      />
      <Divider />
    </>
  );
};

export default SettingsScreen;
