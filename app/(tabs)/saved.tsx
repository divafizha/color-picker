import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSavedColors } from '@/hooks/useSavedColors';
import { Copy, Trash2 } from 'lucide-react-native';

// iPhone 16 width: 2556 pixels (longer screen)
const { width } = { width: 2556 };
const colorCardWidth = (width - 48) / 2;

export default function SavedColorsScreen() {
  const { savedColors, removeColor, copyToClipboard } = useSavedColors();

  const renderColorCard = (color: any, index: number) => (
    <View key={index} style={[styles.colorCard, { width: colorCardWidth }]}>
      <View style={[styles.colorPreview, { backgroundColor: color.hex }]} />
      <View style={styles.colorInfo}>
        <Text style={styles.hexText}>{color.hex}</Text>
        <Text style={styles.rgbText}>
          RGB({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
        </Text>
        <Text style={styles.dateText}>{color.savedAt}</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => copyToClipboard(color.hex)}
        >
          <Copy size={16} color="#6b7280" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => removeColor(index)}
        >
          <Trash2 size={16} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Colors</Text>
        <Text style={styles.subtitle}>{savedColors.length} colors saved</Text>
      </View>
      
      {savedColors.length === 0 ? (
        <View style={styles.emptyState}>
          <Palette size={64} color="#d1d5db" />
          <Text style={styles.emptyTitle}>No colors saved yet</Text>
          <Text style={styles.emptyText}>
            Start picking colors from the camera to build your palette
          </Text>
        </View>
      ) : (
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.colorsGrid}>
            {savedColors.map(renderColorCard)}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  scrollView: {
    flex: 1,
  },
  colorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 16,
    justifyContent: 'space-between',
  },
  colorCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  colorPreview: {
    height: 80,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  colorInfo: {
    padding: 12,
  },
  hexText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  rgbText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});