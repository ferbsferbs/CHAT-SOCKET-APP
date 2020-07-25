import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Example } from './src/example';

export default function App() {
  return (
    <View style={styles.container}>
    <Example></Example>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
