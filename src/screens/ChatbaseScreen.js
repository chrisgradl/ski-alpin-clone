import * as React from 'react';
import { WebView } from 'react-native-webview';

const CHATBASE_URL = 'https://www.chatbase.co/chatbot-iframe/ckUzylAAx6zgZyk_HVvej'

export default function ChatbaseScreen() {
  return (
    <WebView
      source={{ uri: CHATBASE_URL }}
    />
  );
}
