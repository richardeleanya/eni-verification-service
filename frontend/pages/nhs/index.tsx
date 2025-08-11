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
  { title: 'Patient Verifications', value: 0, color: 'accent.green' },
  { title: 'Emergency Alerts', value: 0, color: 'accent.red' },
  { title: 'Prescription Checks', value: 0, color: 'accent.green' },
];

import withAuth from '../../hocs/withAuth';

const NHSDashboard = () => (
  <Layout>
    <Heading size="lg" mb={4}>
      NHS Dashboard
    </Heading>
    ...
  </Layout>
);

export default withAuth(NHSDashboard);