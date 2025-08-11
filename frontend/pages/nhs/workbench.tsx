import React, { useState } from 'react';
import { Grid, GridItem, Heading, useBreakpointValue } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import withAuth from '../../hocs/withAuth';
import PatientSearchInput from '../../components/nhs/PatientSearchInput';
import AppointmentTable from '../../components/nhs/AppointmentTable';
import AppointmentDetailPanel from '../../components/nhs/AppointmentDetailPanel';

const NhsWorkbench: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Layout>
      <Heading size="lg" mb={6}>Emergency Alerts Workbench</Heading>
      <PatientSearchInput />
      <Grid
        templateColumns={isMobile ? '1fr' : '2.5fr 1fr'}
        gap={8}
        mt={6}
      >
        <GridItem>
          <AppointmentTable
            onSelect={(id) => setSelectedId(id)}
            selectedId={selectedId}
          />
        </GridItem>
        <GridItem>
          <AppointmentDetailPanel appointmentId={selectedId} />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default withAuth(NhsWorkbench);