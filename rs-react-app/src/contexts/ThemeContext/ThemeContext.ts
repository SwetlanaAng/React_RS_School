import { createContext } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);
