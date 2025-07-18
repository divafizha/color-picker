import React from 'react';
import { View, StyleSheet, Dimensions, PanGestureHandler, State } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  runOnJS 
} from 'react-native-reanimated';
import { Target } from 'lucide-react-native';

// iPhone 16 dimensions: 2556 x 1600 pixels (longer)
const { width, height } = { width: 2556, height: 1600 };
const CROSSHAIR_SIZE = 60;

interface ColorPickerOverlayProps {
  position: { x: number; y: number };
  onPositionChange: (x: number, y: number) => void;
  isProcessing: boolean;
}

export default function ColorPickerOverlay({ 
  position, 
  onPositionChange, 
  isProcessing 
}: ColorPickerOverlayProps) {
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);
  const scale = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      scale.value = withSpring(1.2);
    })
    .onUpdate((event) => {
      translateX.value = Math.max(
        CROSSHAIR_SIZE / 2,
        Math.min(width - CROSSHAIR_SIZE / 2, event.absoluteX)
      );
      translateY.value = Math.max(
        CROSSHAIR_SIZE / 2,
        Math.min(height - 200, event.absoluteY)
      );
    })
    .onEnd(() => {
      scale.value = withSpring(1);
      runOnJS(onPositionChange)(translateX.value, translateY.value);
    });

  const tapGesture = Gesture.Tap()
    .onStart((event) => {
      translateX.value = withSpring(event.absoluteX);
      translateY.value = withSpring(event.absoluteY);
      scale.value = withSpring(1.2, {}, () => {
        scale.value = withSpring(1);
      });
      runOnJS(onPositionChange)(event.absoluteX, event.absoluteY);
    });

  const composedGesture = Gesture.Race(panGesture, tapGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value - CROSSHAIR_SIZE / 2 },
      { translateY: translateY.value - CROSSHAIR_SIZE / 2 },
      { scale: scale.value },
    ],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: isProcessing ? withSpring(0.6) : withSpring(1),
    transform: [
      { scale: isProcessing ? withSpring(1.1) : withSpring(1) },
    ],
  }));

  return (
    <GestureDetector gesture={composedGesture}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.crosshair, animatedStyle]}>
          <Animated.View style={[styles.crosshairInner, pulseStyle]}>
            <View style={styles.crosshairCenter}>
              <Target size={24} color="#ffffff" strokeWidth={2} />
            </View>
            <View style={styles.crosshairRing} />
          </Animated.View>
        </Animated.View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  crosshair: {
    position: 'absolute',
    width: CROSSHAIR_SIZE,
    height: CROSSHAIR_SIZE,
  },
  crosshairInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crosshairCenter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(59, 130, 246, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  crosshairRing: {
    position: 'absolute',
    width: CROSSHAIR_SIZE,
    height: CROSSHAIR_SIZE,
    borderRadius: CROSSHAIR_SIZE / 2,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});