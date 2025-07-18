import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { Heart, Zap, ZapOff, Image as ImageIcon, RotateCcw } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface ActionButtonsProps {
  onSaveColor: () => void;
  onToggleFlash: () => void;
  onPickFromGallery: () => void;
  onToggleCamera: () => void;
  flashEnabled: boolean;
  hasColor: boolean;
}

export default function ActionButtons({
  onSaveColor,
  onToggleFlash,
  onPickFromGallery,
  onToggleCamera,
  flashEnabled,
  hasColor,
}: ActionButtonsProps) {
  const ActionButton = ({ 
    onPress, 
    icon, 
    label, 
    variant = 'secondary',
    disabled = false 
  }: {
    onPress: () => void;
    icon: React.ReactNode;
    label: string;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
  }) => (
    <TouchableOpacity
      style={[
        styles.actionButton,
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {icon}
      <Text style={[
        styles.buttonText,
        variant === 'primary' ? styles.primaryButtonText : styles.secondaryButtonText,
        disabled && styles.disabledButtonText,
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Animated.View entering={FadeIn.delay(100)}>
          <ActionButton
            onPress={onSaveColor}
            icon={<Heart size={20} color={hasColor ? '#ffffff' : '#9ca3af'} />}
            label="Save Color"
            variant="primary"
            disabled={!hasColor}
          />
        </Animated.View>
        
        <Animated.View entering={FadeIn.delay(200)}>
          <ActionButton
            onPress={onPickFromGallery}
            icon={<ImageIcon size={20} color="#374151" />}
            label="Gallery"
          />
        </Animated.View>
      </View>
      
      <View style={styles.bottomRow}>
        {Platform.OS !== 'web' && (
          <Animated.View entering={FadeIn.delay(300)}>
            <ActionButton
              onPress={onToggleFlash}
              icon={flashEnabled ? 
                <Zap size={20} color="#374151" /> : 
                <ZapOff size={20} color="#374151" />
              }
              label={flashEnabled ? 'Flash On' : 'Flash Off'}
            />
          </Animated.View>
        )}
        
        <Animated.View entering={FadeIn.delay(400)}>
          <ActionButton
            onPress={onToggleCamera}
            icon={<RotateCcw size={20} color="#374151" />}
            label="Flip Camera"
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  topRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 12,
  },
  bottomRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
  },
  secondaryButton: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  disabledButton: {
    backgroundColor: '#f9fafb',
    borderColor: '#e5e7eb',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  primaryButtonText: {
    color: '#ffffff',
  },
  secondaryButtonText: {
    color: '#374151',
  },
  disabledButtonText: {
    color: '#9ca3af',
  },
});