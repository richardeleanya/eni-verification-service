import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    900: '#003366', // Deep Navy
    800: '#1a365d',
    700: '#153e75',
  },
  accent: {
    green: '#28A745',
    red: '#DC3545',
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
};

const theme = extendTheme({ config, colors });

export default theme;