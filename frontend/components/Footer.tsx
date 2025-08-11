import React from 'react';
import { Box, Text, Link, Flex } from '@chakra-ui/react';

const Footer: React.FC = () => (
  <Box as="footer" w="100%" py={4} bg="gray.50" borderTop="1px solid" borderColor="gray.200" mt={12}>
    <Flex
      maxW="6xl"
      mx="auto"
      px={4}
      justify="space-between"
      align="center"
      flexWrap="wrap"
      fontSize="sm"
      color="gray.600"
    >
      <Text>
        Version: {process.env.NEXT_PUBLIC_APP_VERSION || 'dev'} | Built:{' '}
        {process.env.NEXT_PUBLIC_BUILD_TIME || '-'}
      </Text>
      <Link href="mailto:support@eni.gov" color="brand.900" fontWeight="medium">
        Contact Support
      </Link>
    </Flex>
  </Box>
);

export default Footer;