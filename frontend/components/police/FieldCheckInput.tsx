import React from 'react';
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const FieldCheckInput: React.FC = () => (
  <Box mb={4}>
    <InputGroup maxW="400px">
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input placeholder="Quick field identity check (name, ID, NI, etc.)" />
    </InputGroup>
    {/* Placeholder for rapid field search/typeahead */}
  </Box>
);

export default FieldCheckInput;