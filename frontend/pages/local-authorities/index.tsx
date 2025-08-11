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
  { title: 'Council Tax Records', value: 0, color: 'accent.green' },
  { title: 'Housing Applications', value: 0, color: 'accent.green' },
  { title: 'School Enrollments', value: 0, color: 'accent.red' },
];

import withAuth from '../../hocs/withAuth';

const LocalAuthoritiesDashboard = () => (
  <Layout>
    <Heading size="lg" mb={4}>
      Local Authorities Dashboard
    </Heading>
    ...
  </Layout>
);

export default withAuth(LocalAuthoritiesDashboard);