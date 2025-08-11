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
  Skeleton,
} from '@chakra-ui/react';
import Layout from '../../components/Layout';

const kpis = [
  { title: 'Right to Rent Checks', value: 0, color: 'accent.green' },
  { title: 'Tenant History Checks', value: 0, color: 'accent.green' },
  { title: 'Guarantor Verifications', value: 0, color: 'accent.red' },
];

const HousingRentalDashboard = () => (
  <Layout>
    <Heading size="lg" mb={4}>
      Housing & Rental Dashboard
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
            Recent Rental Applications
          </Text>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Application ID</Th>
                <Th>Status</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td colSpan={3}>
                  <Skeleton height="20px" />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </GridItem>
      <GridItem>
        <Box bg="white" boxShadow="sm" borderRadius="md" p={4} h="100%">
          <Text fontWeight="bold" fontSize="md" mb={3}>
            Chart (Placeholder)
          </Text>
          <Skeleton h="180px" borderRadius="md" />
        </Box>
      </GridItem>
    </Grid>
  </Layout>
);

export default HousingRentalDashboard;