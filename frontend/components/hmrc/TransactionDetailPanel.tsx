import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';

type TransactionDetailPanelProps = {
  transactionId: number | null;
};

const TransactionDetailPanel: React.FC<TransactionDetailPanelProps> = ({ transactionId }) => (
  <Box bg="white" borderRadius="md" boxShadow="sm" p={4} minH="250px">
    <Heading size="sm" mb={2}>
      Transaction Detail
    </Heading>
    {transactionId == null ? (
      <Text color="gray.400">Select a case to view details.</Text>
    ) : (
      <>
        <Box
          bg="gray.100"
          borderRadius="md"
          h="160px"
          mb={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="gray.500">[Chart placeholder]</Text>
        </Box>
        <Text color="gray.600">
          Details for transaction ID <b>{transactionId}</b> would appear here.
        </Text>
      </>
    )}
  </Box>
);

export default TransactionDetailPanel;