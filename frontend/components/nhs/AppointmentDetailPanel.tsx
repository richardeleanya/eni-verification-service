import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';

type AppointmentDetailPanelProps = {
  appointmentId: number | null;
};

const AppointmentDetailPanel: React.FC<AppointmentDetailPanelProps> = ({ appointmentId }) => (
  <Box bg="white" borderRadius="md" boxShadow="sm" p={4} minH="250px">
    <Heading size="sm" mb={2}>
      Appointment Detail
    </Heading>
    {appointmentId == null ? (
      <Text color="gray.400">Select an appointment to view details.</Text>
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
          <Text color="gray.500">[Chart/Map placeholder]</Text>
        </Box>
        <Text color="gray.600">
          Details for appointment ID <b>{appointmentId}</b> would appear here.
        </Text>
      </>
    )}
  </Box>
);

export default AppointmentDetailPanel;