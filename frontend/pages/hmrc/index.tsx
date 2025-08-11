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

import withAuth from '../../hocs/withAuth';

const HMRCDashboard = () => (
  <Layout>
    <Heading size="lg" mb={4}>
      HMRC Dashboard
    </Heading>
    ...
  </Layout>
);

export default withAuth(HMRCDashboard);