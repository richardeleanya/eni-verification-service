import React, { useEffect, useRef } from 'react';
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface CaseSearchInputProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const CaseSearchInput: React.FC<CaseSearchInputProps> = ({
  searchTerm,
  onSearch,
}) => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearch(value);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <Box mb={4}>
      <InputGroup maxW="400px">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Search by applicant name, ID, or reference..."
          value={searchTerm}
          onChange={handleChange}
        />
      </InputGroup>
    </Box>
  );
};

export default CaseSearchInput;