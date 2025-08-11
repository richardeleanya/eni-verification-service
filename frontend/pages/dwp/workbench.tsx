import React, { useState } from 'react';
import { Grid, GridItem, Heading, useBreakpointValue } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import withAuth from '../../hocs/withAuth';
import BenefitSearchInput from '../../components/dwp/BenefitSearchInput';
import ClaimsTable from '../../components/dwp/ClaimsTable';
import ClaimDetailPanel from '../../components/dwp/ClaimDetailPanel';

const DwpWorkbench: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Layout>
      <Heading size="lg" mb={6}>Benefit Claim Workbench</Heading>
      <BenefitSearchInput />
      <Grid
        templateColumns={isMobile ? '1fr' : '2.5fr 1fr'}
        gap={8}
        mt={6}
      >
        <GridItem>
          <ClaimsTable
            onSelect={(id) => setSelectedId(id)}
            selectedId={selectedId}
          />
        </GridItem>
        <GridItem>
          <ClaimDetailPanel claimId={selectedId} />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default withAuth(DwpWorkbench);