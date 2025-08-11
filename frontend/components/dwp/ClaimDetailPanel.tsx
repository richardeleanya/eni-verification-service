import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';

type ClaimDetailPanelProps = {
  claimId: number | null;
};

const ClaimDetailPanel: React.FC<ClaimDetailPanelProps> = ({ claimId }) => (
  <Box bg="white" borderRadius="md" boxShadow="sm" p={4} minH="250px">
    <Heading size="sm" mb={2}>
      Claim Detail
    </Heading>
    {claimId == null ? (
      <Text color="gray.400">Select a claim to view details.</Text>
    ) : (
      <>
        <Box
          bg="gray.100"
          borderRadius="md"
          h="120px"
          mb={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="gray.500">[Eligibility check placeholder]</Text>
        </Box>
        <Text color="gray.600">
          Details for claim ID <b>{claimId}</b> would appear here.
        </Text>
      </>
    )}
  </Box>
);

export default ClaimDetailPanel;