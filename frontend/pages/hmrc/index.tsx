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
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const kpis = [
  { title: 'Tax Evasion Flags', value: 0, color: 'accent.red' },
  { title: 'Business Compliance Checks', value: 0, color: 'accent.green' },
  { title: 'Self-Assessment Deadlines', value: 0, color: 'accent.green' },
];

const data = [
  { month: 'Jan', collected: 400 },
  { month: 'Feb', collected: 380 },
  { month: 'Mar', collected: 420 },
  { month: 'Apr', collected: 390 },
  { month: 'May', collected: 440 },
  { month: 'Jun', collected: 410 },
];

const HMRCDashboard = () => (
  <Layout>
    <Heading size="lg" mb={4}>
      HMRC Dashboard
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
            Recent Audit Cases
          </Text>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Case ID</Th>
                <Th>Status</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td colSpan={3}>
                  {/* Replace with real data */}
                  <Text color="gray.400" align="center">
                    No recent cases.
                  </Text>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </GridItem>
      <GridItem>
        <Box bg="white" boxShadow="sm" borderRadius="md" p={4} h="100%">
          <Text fontWeight="bold" fontSize="md" mb={3}>
            Tax Collection Chart
          </Text>
          <Box w="100%" h="180px">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="collected" fill="#3182ce" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </GridItem>
    </Grid>
  </Layout>
);

export default HMRCDashboard;