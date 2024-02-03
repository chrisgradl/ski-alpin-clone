import * as React from 'react';
import { WebView } from 'react-native-webview';

export default function StoryDetailScreen({ route }) {
  const { uri } = route.params;

  return <WebView source={{ uri }} />;
}
