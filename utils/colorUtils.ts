export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export async function extractColorFromImage(imageUri: string): Promise<{
  hex: string;
  rgb: { r: number; g: number; b: number };
}> {
  // In a real implementation, you would use a library like react-native-image-colors
  // or implement image analysis to extract the dominant color from the image
  
  // For demo purposes, generate a random color
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  
  return {
    hex: rgbToHex(r, g, b),
    rgb: { r, g, b },
  };
}

export async function copyToClipboard(text: string): Promise<void> {
  // This is handled in the hook for platform-specific implementations
  throw new Error('Use the copyToClipboard function from useSavedColors hook');
}