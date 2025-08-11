import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';

type RecordDetailPanelProps = {
  recordId: number | null;
};

const RecordDetailPanel: React.FC<RecordDetailPanelProps> = ({ recordId }) => (
  <Box bg="white" borderRadius="md" boxShadow="sm" p={4} minH="250px">
    <Heading size="sm" mb={2}>
      Record Detail
    </Heading>
    {recordId == null ? (
      <Text color="gray.400">Select a record to view details.</Text>
    ) : (
      <>
        <Box
          bg="gray.100"
          borderRadius="md"
          h="150px"
          mb={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="gray.500">[Map placeholder]</Text>
        </Box>
        <Text color="gray.600">
          Details for record ID <b>{recordId}</b> would appear here.
        </Text>
      </>
    )}
  </Box>
);

export default RecordDetailPanel;