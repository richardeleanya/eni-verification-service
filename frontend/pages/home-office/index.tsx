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
import { MapContainer, TileLayer } from 'react-leaflet';

const kpis = [
  { title: 'Overstayer Alerts', value: 12, color: 'accent.red' },
  { title: 'Pending Asylum Cases', value: 27, color: 'accent.green' },
  { title: 'Border Alerts', value: 4, color: 'accent.red' },
];

import withAuth from '../../hocs/withAuth';

const HomeOfficeDashboard = () => (
  <Layout>
    <Heading size="lg" mb={4}>
      Home Office Dashboard
    </Heading>
    ...
  </Layout>
);

export default withAuth(HomeOfficeDashboard);