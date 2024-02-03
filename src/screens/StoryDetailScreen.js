import * as React from 'react';
import { WebView } from 'react-native-webview';

// has a bug where video is opened automatically
export default function StoryDetailScreen({ route }) {
  const { story } = route.params;

  return (
    <WebView source={{ uri: story?.OrfOnHref }} />
  );
}
