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
  { title: 'Age Verifications', value: 0, color: 'accent.green' },
  { title: 'Payment Authentications', value: 0, color: 'accent.green' },
  { title: 'Returns Fraud Flags', value: 0, color: 'accent.red' },
];

import withAuth from '../../hocs/withAuth';

const RetailDashboard = () => (
  <Layout>
    <Heading size="lg" mb={4}>
      Retail & E-Commerce Dashboard
    </Heading>
    ...
  </Layout>
);

export default withAuth(RetailDashboard);