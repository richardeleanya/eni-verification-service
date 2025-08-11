import React, { useState } from 'react';
import { Grid, GridItem, Heading, useBreakpointValue } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import withAuth from '../../hocs/withAuth';
import TaxCaseSearchInput from '../../components/hmrc/TaxCaseSearchInput';
import TransactionTable from '../../components/hmrc/TransactionTable';
import TransactionDetailPanel from '../../components/hmrc/TransactionDetailPanel';

const HmrcWorkbench: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Layout>
      <Heading size="lg" mb={6}>Fraud Investigation Workbench</Heading>
      <TaxCaseSearchInput />
      <Grid
        templateColumns={isMobile ? '1fr' : '2.5fr 1fr'}
        gap={8}
        mt={6}
      >
        <GridItem>
          <TransactionTable
            onSelect={(id) => setSelectedId(id)}
            selectedId={selectedId}
          />
        </GridItem>
        <GridItem>
          <TransactionDetailPanel transactionId={selectedId} />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default withAuth(HmrcWorkbench);