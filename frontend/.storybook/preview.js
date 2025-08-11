import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';

export const decorators = [
  (Story) => (
    <ChakraProvider theme={theme}>
      <Story />
    </ChakraProvider>
  ),
];