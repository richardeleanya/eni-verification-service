import React from 'react';
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const TaxCaseSearchInput: React.FC = () => (
  <Box mb={4}>
    <InputGroup maxW="400px">
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input placeholder="Search tax case by ID or taxpayer name..." />
    </InputGroup>
    {/* Placeholder for typeahead or filtering */}
  </Box>
);

export default TaxCaseSearchInput;