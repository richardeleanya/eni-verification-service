import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ChakraProvider } from '@chakra-ui/react';
import eniTheme from '../theme/eniTheme';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('Sidebar, Topbar, Footer have no a11y violations', async () => {
    const { container } = render(
      <ChakraProvider theme={eniTheme}>
        <Sidebar />
        <Topbar />
        <Footer />
      </ChakraProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});