import React, { createContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';

interface ThemeContextType {
  isDark: boolean;
  setScheme: (scheme: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  setScheme: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDark, setIsDark] = useState(Appearance.getColorScheme() === 'dark');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDark(colorScheme === 'dark');
    });

    return () => subscription.remove();
  }, []);

  const setScheme = (scheme: string) => setIsDark(scheme === 'dark');

  return (
    <ThemeContext.Provider value={{ isDark, setScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
