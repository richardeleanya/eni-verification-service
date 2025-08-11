import React from 'react';
import { Grid, GridItem, Box, Heading } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import withAuth from '../../hocs/withAuth';
import CaseSearchInput from '../../components/home-office/CaseSearchInput';
import ApplicationTable from '../../components/home-office/ApplicationTable';
import ApplicationDetailPanel from '../../components/home-office/ApplicationDetailPanel';

const HomeOfficeWorkbench: React.FC = () => (
  <Layout>
    <Heading size="lg" mb={6}>Visa Application Workbench</Heading>
    <CaseSearchInput />
    <Grid templateColumns={['1fr', '2.5fr 1fr']} gap={8} mt={6}>
      <GridItem>
        <ApplicationTable />
      </GridItem>
      <GridItem>
        <ApplicationDetailPanel />
      </GridItem>
    </Grid>
  </Layout>
);

export default withAuth(HomeOfficeWorkbench);