import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import {
  TextInput,
  Button,
  ActivityIndicator,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';

import getCodeComponent from '../components/PreviewComponent';

// 'https://react-native-app-builder-beta.vercel.app/api/generate-component',
const API_URL = 'http://10.55.100.184:3000/api/generate-component';

export default function GeneratedUIScreen() {
  const [prompt, setPrompt] = useState('');
  const [DynamicComponent, setDynamicComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();

  const generateComponent = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setDynamicComponent(null);

    try {
      const response = await fetch(
        API_URL,
        {
          method: 'POST',
          headers: {
            'Authorization': 'demo-token-264100d4-3047',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt }),
        }
      );
      const res = await response.json();
      const Component = await getCodeComponent(res.transpiledCode);
      setDynamicComponent(() => Component);
    } catch (err) {
      console.error('Component generation error:', err);
      setError('Failed to generate component. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <Surface style={styles.previewSurface} elevation={1}>
          <View style={styles.previewContainer}>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={styles.loadingText}>Creating your component...</Text>
              </View>
            ) : error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : DynamicComponent ? (
              <DynamicComponent />
            ) : (
              <View style={styles.placeholderContainer}>
                <Text style={styles.placeholderText}>
                  Your generated component will appear here
                </Text>
              </View>
            )}
          </View>
        </Surface>
        <Surface style={styles.inputSurface} elevation={2}>
          <TextInput
            maxLength={100}
            mode="outlined"
            label="Describe your component"
            placeholder="a simple ski race game"
            value={prompt}
            onChangeText={setPrompt}
            multiline
            numberOfLines={3}
            style={styles.input}
            outlineStyle={styles.inputOutline}
            disabled={isLoading}
          />
          <Button
            mode="contained"
            onPress={generateComponent}
            loading={isLoading}
            disabled={isLoading || !prompt.trim()}
            style={styles.button}
            contentStyle={styles.buttonContent}
            icon="auto-fix"
          >
            {isLoading ? 'Generating...' : 'Generate Component'}
          </Button>
        </Surface>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardView: {
    flex: 1,
    padding: 16,
  },
  inputSurface: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    marginBottom: 12,
    fontWeight: '600',
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#ffffff',
  },
  inputOutline: {
    borderRadius: 8,
  },
  button: {
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 6,
  },
  previewSurface: {
    flex: 1,
    padding: 6,
    borderRadius: 12,
  },
  previewTitle: {
    marginBottom: 12,
    color: '#666666',
  },
  previewContainer: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    color: '#666666',
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#d32f2f',
    textAlign: 'center',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderText: {
    color: '#999999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
