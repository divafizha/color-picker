import React from 'react';
import { View, StyleSheet } from 'react-native';
import ColorPicker from '@/components/ColorPicker';

export default function CameraScreen() {
  return (
    <View style={styles.container}>
      <ColorPicker />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
});