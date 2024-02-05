import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { PaperProvider } from 'react-native-paper';

import { CombinedDarkTheme, CombinedDefaultTheme } from './src/AppTheming';
import { LinkingConfig } from './src/NavigationConfig';
import RootNavigation from './src/RootNavigation';
import { PreferencesContext } from './src/context/PreferencesContext';
import usePushNotifications from './src/hooks/usePushNotifications';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

export default function App() {
  usePushNotifications();

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

  return (
    <PreferencesContext.Provider value={preferences}>
      <StatusBar style={isThemeDark ? 'light' : 'dark'} />
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={theme}>
          <NavigationContainer linking={LinkingConfig} theme={theme}>
            <RootNavigation />
          </NavigationContainer>
        </PaperProvider>
      </QueryClientProvider>
    </PreferencesContext.Provider>
  );
}
