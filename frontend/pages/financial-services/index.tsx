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
  { title: 'KYC Verifications', value: 0, color: 'accent.green' },
  { title: 'Fraud Alerts', value: 0, color: 'accent.red' },
  { title: 'Credit Risk Assessments', value: 0, color: 'accent.red' },
];

import withAuth from '../../hocs/withAuth';

const FinancialServicesDashboard = () => (
  <Layout>
    <Heading size="lg" mb={4}>
      Financial Services Dashboard
    </Heading>
    ...
  </Layout>
);

export default withAuth(FinancialServicesDashboard);