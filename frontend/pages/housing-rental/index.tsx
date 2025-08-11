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

import withAuth from '../../hocs/withAuth';

const HousingRentalDashboard = () => (
  <Layout>
    <Heading size="lg" mb={4}>
      Housing & Rental Dashboard
    </Heading>
    ...
  </Layout>
);

export default withAuth(HousingRentalDashboard);