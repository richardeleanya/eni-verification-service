import React from 'react';
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const PatientSearchInput: React.FC = () => (
  <Box mb={4}>
    <InputGroup maxW="400px">
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input placeholder="Search by patient name, ID, NHS number..." />
    </InputGroup>
    {/* Placeholder for typeahead */}
  </Box>
);

export default PatientSearchInput;