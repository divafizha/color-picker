import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import ColorPickerOverlay from './ColorPickerOverlay';
import ColorInfo from './ColorInfo';
import ActionButtons from './ActionButtons';
import PermissionRequest from './PermissionRequest';
import { useColorPicker } from '@/hooks/useColorPicker';

const { width, height } = Dimensions.get('window');

export default function ColorPicker() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  
  const {
    pickedColor,
    crosshairPosition,
    isProcessing,
    pickColorAtPosition,
    pickColorFromGallery,
    saveCurrentColor,
  } = useColorPicker();

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <PermissionRequest 
        onRequestPermission={requestPermission}
      />
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    if (Platform.OS !== 'web') {
      setFlashEnabled(!flashEnabled);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView 
          ref={cameraRef}
          style={styles.camera} 
          facing={facing}
          enableTorch={Platform.OS !== 'web' ? flashEnabled : false}
        >
          <ColorPickerOverlay
            position={crosshairPosition}
            onPositionChange={pickColorAtPosition}
            isProcessing={isProcessing}
          />
        </CameraView>
      </View>
      
      <View style={styles.bottomSection}>
        <ColorInfo color={pickedColor} />
        <ActionButtons
          onSaveColor={saveCurrentColor}
          onToggleFlash={toggleFlash}
          onPickFromGallery={pickColorFromGallery}
          onToggleCamera={toggleCameraFacing}
          flashEnabled={flashEnabled}
          hasColor={!!pickedColor}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  bottomSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
});