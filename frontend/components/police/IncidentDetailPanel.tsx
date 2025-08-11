import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

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
          borderRadius="md"
          h="160px"
          mb={3}
          overflow="hidden"
        >
          <MapContainer
            center={[51.505, -0.09]}
            zoom={5}
            style={{ width: '100%', height: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.5, -0.09]}>
              <Popup>
                Incident ID: <b>{incidentId}</b>
              </Popup>
            </Marker>
          </MapContainer>
        </Box>
        <Text color="gray.600">
          Details for incident ID <b>{incidentId}</b> would appear here.
        </Text>
      </>
    )}
  </Box>
);

export default IncidentDetailPanel;