import React from 'react';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  Card,
  CardBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import Layout from '../../components/Layout';
import { MapContainer, TileLayer } from 'react-leaflet';

const kpis = [
  { title: 'Overstayer Alerts', value: 12, color: 'accent.red' },
  { title: 'Pending Asylum Cases', value: 27, color: 'accent.green' },
  { title: 'Border Alerts', value: 4, color: 'accent.red' },
];

const HomeOfficeDashboard = () => (
  <Layout>
    <Heading size="lg" mb={4}>
      Home Office Dashboard
    </Heading>
    <SimpleGrid columns={[1, 3]} spacing={6} mb={8}>
      {kpis.map((kpi) => (
        <Card key={kpi.title} bg={kpi.color} color="white" boxShadow="md">
          <CardBody>
            <Text fontSize="sm" mb={1} fontWeight="medium">
              {kpi.title}
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              {kpi.value}
            </Text>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
    <Grid templateColumns={['1fr', '2fr 1fr']} gap={8}>
      <GridItem>
        <Box bg="white" boxShadow="sm" borderRadius="md" p={4} mb={6}>
          <Text fontWeight="bold" fontSize="md" mb={3}>
            Recent Visa Applications
          </Text>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Status</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Aliya Khan</Td>
                <Td>
                  <Box as="span" color="accent.green" fontWeight="bold">
                    Approved
                  </Box>
                </Td>
                <Td>2025-08-08</Td>
              </Tr>
              <Tr>
                <Td>John Doe</Td>
                <Td>
                  <Box as="span" color="accent.red" fontWeight="bold">
                    Rejected
                  </Box>
                </Td>
                <Td>2025-08-10</Td>
              </Tr>
              <Tr>
                <Td>Ming Wei</Td>
                <Td>
                  <Box as="span" color="gray.700" fontWeight="bold">
                    Pending
                  </Box>
                </Td>
                <Td>2025-08-11</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </GridItem>
      <GridItem>
        <Box bg="white" boxShadow="sm" borderRadius="md" p={4} h="100%">
          <Text fontWeight="bold" fontSize="md" mb={3}>
            Entry/Exit Map
          </Text>
          <Box w="100%" h="180px" borderRadius="md" overflow="hidden">
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
            </MapContainer>
          </Box>
        </Box>
      </GridItem>
    </Grid>
  </Layout>
);

export default HomeOfficeDashboard;