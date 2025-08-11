import React from 'react';
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const RecordSearchInput: React.FC = () => (
  <Box mb={4}>
    <InputGroup maxW="400px">
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input placeholder="Search by application ID, address, or name..." />
    </InputGroup>
    {/* Placeholder for typeahead */}
  </Box>
);

export default RecordSearchInput;