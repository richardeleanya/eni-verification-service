import * as React from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import eniTheme from '../theme/eniTheme';
import { AuthProvider } from '../context/AuthContext';
import Footer from '../components/Footer';
import 'leaflet/dist/leaflet.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={eniTheme}>
      <AuthProvider>
        <Component {...pageProps} />
        <Footer />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;