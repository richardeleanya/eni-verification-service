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
  { title: 'Student Eligibility Checks', value: 0, color: 'accent.green' },
  { title: 'Academic History Verifications', value: 0, color: 'accent.green' },
  { title: 'Finance Eligibility Checks', value: 0, color: 'accent.red' },
];

import withAuth from '../../hocs/withAuth';

const EducationDashboard = () => (
  <Layout>
    <Heading size="lg" mb={4}>
      Education Sector Dashboard
    </Heading>
    ...
  </Layout>
);

export default withAuth(EducationDashboard);