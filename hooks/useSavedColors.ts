import { useState, useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import * as Clipboard from 'expo-clipboard';

interface SavedColor {
  hex: string;
  rgb: { r: number; g: number; b: number };
  savedAt: string;
}

export function useSavedColors() {
  const [savedColors, setSavedColors] = useState<SavedColor[]>([
    // Mock data for demonstration
    {
      hex: '#3B82F6',
      rgb: { r: 59, g: 130, b: 246 },
      savedAt: 'Today, 2:30 PM',
    },
    {
      hex: '#EF4444',
      rgb: { r: 239, g: 68, b: 68 },
      savedAt: 'Yesterday, 4:15 PM',
    },
    {
      hex: '#10B981',
      rgb: { r: 16, g: 185, b: 129 },
      savedAt: 'Jan 15, 2025',
    },
  ]);

  const addColor = useCallback((color: { hex: string; rgb: { r: number; g: number; b: number } }) => {
    const newColor: SavedColor = {
      ...color,
      savedAt: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }),
    };
    
    setSavedColors(prev => [newColor, ...prev]);
  }, []);

  const removeColor = useCallback((index: number) => {
    Alert.alert(
      'Remove Color',
      'Are you sure you want to remove this color from your saved palette?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            setSavedColors(prev => prev.filter((_, i) => i !== index));
          }
        },
      ]
    );
  }, []);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      if (Platform.OS === 'web') {
        await navigator.clipboard.writeText(text);
      } else {
        await Clipboard.setStringAsync(text);
      }
      Alert.alert('Copied', `${text} copied to clipboard!`);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  }, []);

  return {
    savedColors,
    addColor,
    removeColor,
    copyToClipboard,
  };
}