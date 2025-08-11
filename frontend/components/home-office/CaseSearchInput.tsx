import React from 'react';
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const CaseSearchInput: React.FC = () => (
  <Box mb={4}>
    <InputGroup maxW="400px">
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input placeholder="Search by applicant name, ID, or reference..." />
    </InputGroup>
    {/* Placeholder for typeahead/autocomplete suggestions */}
  </Box>
);

export default CaseSearchInput;