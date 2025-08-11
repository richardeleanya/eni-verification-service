import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const eniTheme = extendTheme({
  config,
  colors: {
    brand: {
      900: '#002244', // Deep Navy
      800: '#19335a',
      700: '#29406b',
    },
    accent: {
      green: '#2ecc71',
      red: '#e74c3c',
    },
    gray: {
      50: '#f9f9f9',
      100: '#f3f3f3',
      200: '#e3e3e3',
      300: '#cfcfcf',
      400: '#b1b1b1',
      500: '#929292',
      600: '#636363',
      700: '#424242',
      800: '#232323',
      900: '#111111',
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
    mono: `'Inter', monospace`,
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
  },
  space: [0, 4, 8, 12, 16, 24, 32, 48, 64],
});

export default eniTheme;