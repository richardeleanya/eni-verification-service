import React, { useState } from 'react';
import { Grid, GridItem, Heading, Box, useBreakpointValue } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import withAuth from '../../hocs/withAuth';
import FieldCheckInput from '../../components/police/FieldCheckInput';
import IncidentTable from '../../components/police/IncidentTable';
import IncidentDetailPanel from '../../components/police/IncidentDetailPanel';

const PoliceWorkbench: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Layout>
      <Heading size="lg" mb={6}>Field Incident Workbench</Heading>
      <FieldCheckInput />
      <Grid
        templateColumns={isMobile ? '1fr' : '2.5fr 1fr'}
        gap={8}
        mt={6}
      >
        <GridItem>
          <IncidentTable
            onSelect={(id) => setSelectedId(id)}
            selectedId={selectedId}
          />
        </GridItem>
        <GridItem>
          <IncidentDetailPanel incidentId={selectedId} />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default withAuth(PoliceWorkbench);