import React, { useState } from 'react';
import { Grid, GridItem, Heading, useBreakpointValue } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import withAuth from '../../hocs/withAuth';
import RecordSearchInput from '../../components/local-authorities/RecordSearchInput';
import RecordTable from '../../components/local-authorities/RecordTable';
import RecordDetailPanel from '../../components/local-authorities/RecordDetailPanel';

const LocalAuthoritiesWorkbench: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Layout>
      <Heading size="lg" mb={6}>Local Authorities Workbench</Heading>
      <RecordSearchInput />
      <Grid
        templateColumns={isMobile ? '1fr' : '2.5fr 1fr'}
        gap={8}
        mt={6}
      >
        <GridItem>
          <RecordTable
            onSelect={(id) => setSelectedId(id)}
            selectedId={selectedId}
          />
        </GridItem>
        <GridItem>
          <RecordDetailPanel recordId={selectedId} />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default withAuth(LocalAuthoritiesWorkbench);