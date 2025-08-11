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
  { title: 'Active Warrants', value: 0, color: 'accent.red' },
  { title: 'High-Risk Individuals', value: 0, color: 'accent.red' },
  { title: 'ANPR Alerts', value: 0, color: 'accent.green' },
];

import withAuth from '../../hocs/withAuth';

const PoliceDashboard = () => (
  <Layout>
    <Heading size="lg" mb={4}>
      Police Services Dashboard
    </Heading>
    ...
  </Layout>
);

export default withAuth(PoliceDashboard);