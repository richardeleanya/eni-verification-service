import React, { ReactNode } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = ({ children }: { children: ReactNode }) => (
  <Flex w="100vw" minH="100vh" bg="gray.50">
    <Sidebar />
    <Box flex="1" minH="100vh">
      <Topbar />
      <Box px={8} py={6}>
        {children}
      </Box>
    </Box>
  </Flex>
);

export default Layout;