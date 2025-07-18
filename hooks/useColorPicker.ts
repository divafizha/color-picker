import { useState, useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Dimensions } from 'react-native';
import { extractColorFromImage, rgbToHex } from '@/utils/colorUtils';
import { useSavedColors } from './useSavedColors';

// iPhone 16 dimensions: 2556 x 1600 pixels (longer)
const { width, height } = { width: 2556, height: 1600 };

export function useColorPicker() {
  const [pickedColor, setPickedColor] = useState<{
    hex: string;
    rgb: { r: number; g: number; b: number };
  } | null>(null);
  
  const [crosshairPosition, setCrosshairPosition] = useState({
    x: width / 2,
    y: height / 3,
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const { addColor } = useSavedColors();

  const pickColorAtPosition = useCallback(async (x: number, y: number) => {
    setIsProcessing(true);
    setCrosshairPosition({ x, y });
    
    try {
      // Simulate color extraction - in a real app, you'd capture the camera frame
      // and extract the color at the specific pixel coordinates
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mock color extraction based on position for demo
      const normalizedX = x / width;
      const normalizedY = y / height;
      
      const r = Math.floor(normalizedX * 255);
      const g = Math.floor(normalizedY * 255);
      const b = Math.floor((normalizedX + normalizedY) / 2 * 255);
      
      const rgb = { r, g, b };
      const hex = rgbToHex(r, g, b);
      
      setPickedColor({ hex, rgb });
    } catch (error) {
      console.error('Error picking color:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [width, height]);

  const pickColorFromGallery = useCallback(async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permission.granted) {
        Alert.alert(
          'Permission Required',
          'Please grant access to your photo library to pick colors from images.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setIsProcessing(true);
        const color = await extractColorFromImage(result.assets[0].uri);
        setPickedColor(color);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Error picking color from gallery:', error);
      setIsProcessing(false);
    }
  }, []);

  const saveCurrentColor = useCallback(() => {
    if (pickedColor) {
      addColor(pickedColor);
      Alert.alert('Color Saved', 'The color has been added to your saved palette.');
    }
  }, [pickedColor, addColor]);

  return {
    pickedColor,
    crosshairPosition,
    isProcessing,
    pickColorAtPosition,
    pickColorFromGallery,
    saveCurrentColor,
  };
}