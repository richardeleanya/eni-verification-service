import React, { useState } from 'react';
import { Grid, GridItem, Heading } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import withAuth from '../../hocs/withAuth';
import CaseSearchInput from '../../components/home-office/CaseSearchInput';
import ApplicationTable from '../../components/home-office/ApplicationTable';
import ApplicationDetailPanel from '../../components/home-office/ApplicationDetailPanel';

const HomeOfficeWorkbench: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <Layout>
      <Heading size="lg" mb={6}>
        Visa Application Workbench
      </Heading>
      <CaseSearchInput />
      <Grid templateColumns={['1fr', '2.5fr 1fr']} gap={8} mt={6}>
        <GridItem>
          <ApplicationTable
            onSelect={(id) => setSelectedId(id)}
            selectedId={selectedId}
          />
        </GridItem>
        <GridItem>
          <ApplicationDetailPanel applicationId={selectedId} />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default withAuth(HomeOfficeWorkbench);