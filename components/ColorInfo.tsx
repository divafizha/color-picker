import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Copy } from 'lucide-react-native';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { copyToClipboard } from '@/utils/colorUtils';

interface ColorInfoProps {
  color: {
    hex: string;
    rgb: { r: number; g: number; b: number };
  } | null;
}

export default function ColorInfo({ color }: ColorInfoProps) {
  if (!color) {
    return (
      <View style={styles.container}>
        <Text style={styles.instructionText}>
          Tap anywhere on the camera feed to pick a color
        </Text>
      </View>
    );
  }

  const handleCopyHex = () => {
    copyToClipboard(color.hex);
  };

  const handleCopyRgb = () => {
    copyToClipboard(`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`);
  };

  return (
    <Animated.View 
      style={styles.container}
      entering={FadeIn.duration(300)}
    >
      <View style={styles.colorDisplay}>
        <Animated.View 
          style={[
            styles.colorPreview, 
            { backgroundColor: color.hex }
          ]}
          entering={SlideInUp.duration(400)}
        />
        
        <View style={styles.colorValues}>
          <TouchableOpacity 
            style={styles.valueRow}
            onPress={handleCopyHex}
            activeOpacity={0.7}
          >
            <View style={styles.valueContent}>
              <Text style={styles.valueLabel}>HEX</Text>
              <Text style={styles.valueText}>{color.hex}</Text>
            </View>
            <Copy size={16} color="#6b7280" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.valueRow}
            onPress={handleCopyRgb}
            activeOpacity={0.7}
          >
            <View style={styles.valueContent}>
              <Text style={styles.valueLabel}>RGB</Text>
              <Text style={styles.valueText}>
                {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
              </Text>
            </View>
            <Copy size={16} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '500',
    paddingVertical: 24,
    lineHeight: 24,
  },
  colorDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  colorPreview: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  colorValues: {
    flex: 1,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  valueContent: {
    flex: 1,
  },
  valueLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
    marginBottom: 2,
  },
  valueText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '700',
    fontFamily: 'monospace',
  },
});