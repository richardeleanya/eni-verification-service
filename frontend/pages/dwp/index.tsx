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
  { title: 'Benefit Claims', value: 0, color: 'accent.green' },
  { title: 'Capability Assessments', value: 0, color: 'accent.green' },
  { title: 'Universal Credit Status Checks', value: 0, color: 'accent.red' },
];

import withAuth from '../../hocs/withAuth';

const DWPDashboard = () => (
  <Layout>
    <Heading size="lg" mb={4}>
      DWP Dashboard
    </Heading>
    ...
  </Layout>
);

export default withAuth(DWPDashboard);