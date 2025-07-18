import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ColorContextType = {
  colors: string[];
  saveColor: (color: string) => void;
};

const ColorContext = createContext<ColorContextType>({
  colors: [],
  saveColor: () => {},
});

export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    // Load warna dari penyimpanan saat app dibuka
    AsyncStorage.getItem('savedColors').then((data) => {
      if (data) {
        setColors(JSON.parse(data));
      }
    });
  }, []);

  const saveColor = async (color: string) => {
    const updatedColors = [...colors, color];
    setColors(updatedColors);
    await AsyncStorage.setItem('savedColors', JSON.stringify(updatedColors));
  };

  return (
    <ColorContext.Provider value={{ colors, saveColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColors = () => useContext(ColorContext);
