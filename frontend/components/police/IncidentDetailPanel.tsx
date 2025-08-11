import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';

type IncidentDetailPanelProps = {
  incidentId: number | null;
};

const IncidentDetailPanel: React.FC<IncidentDetailPanelProps> = ({ incidentId }) => (
  <Box bg="white" borderRadius="md" boxShadow="sm" p={4} minH="250px">
    <Heading size="sm" mb={2}>
      Incident Detail
    </Heading>
    {incidentId == null ? (
      <Text color="gray.400">Select an incident to view details.</Text>
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
          <Text color="gray.500">[Map placeholder]</Text>
        </Box>
        <Text color="gray.600">
          Details for incident ID <b>{incidentId}</b> would appear here.
        </Text>
      </>
    )}
  </Box>
);

export default IncidentDetailPanel;