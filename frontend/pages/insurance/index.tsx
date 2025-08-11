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
  { title: 'Identity Verifications', value: 0, color: 'accent.green' },
  { title: 'Claims History Checks', value: 0, color: 'accent.green' },
  { title: 'Risk Assessment Flags', value: 0, color: 'accent.red' },
];

import withAuth from '../../hocs/withAuth';

const InsuranceDashboard = () => (
  <Layout>
    <Heading size="lg" mb={4}>
      Insurance Companies Dashboard
    </Heading>
    ...
  </Layout>
);

export default withAuth(InsuranceDashboard);