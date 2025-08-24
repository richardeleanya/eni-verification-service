import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Grid,
  GridItem,
  Spinner,
  Alert,
  AlertIcon,
  useToast,
} from '@chakra-ui/react';
import Layout from '../../components/Layout';
import withAuth from '../../hocs/withAuth';
import HousingRentalRecordTable from '../../components/housing-rental/HousingRentalRecordTable';
import HousingRentalRecordDetailPanel from '../../components/housing-rental/HousingRentalRecordDetailPanel';
import { HousingRentalRecord } from '../../types';

const HousingRentalWorkbench: React.FC = () => {
  const [records, setRecords] = useState<HousingRentalRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<HousingRentalRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch('/api/integrations/housing-rental');
        if (!response.ok) {
          throw new Error('Failed to fetch housing rental records');
        }
        const data = await response.json();
        setRecords(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const handleVerify = async (id: number) => {
    try {
      const response = await fetch(`/api/integrations/housing-rental/${id}/verify`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to verify housing rental record');
      }
      const updatedRecord = await response.json();
      setRecords(records.map(r => r.id === id ? updatedRecord : r));
      if (selectedRecord?.id === id) {
        setSelectedRecord(updatedRecord);
      }
      toast({
        title: 'Record verified',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error verifying record',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleRowClick = (record: HousingRentalRecord) => {
    setSelectedRecord(record);
  };

  if (isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading size="lg" mb={4}>
        Housing & Rental Workbench
      </Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem colSpan={2}>
          <Box bg="white" p={6} rounded="md" shadow="md">
            <HousingRentalRecordTable records={records} onVerify={handleVerify} onRowClick={handleRowClick} />
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Box bg="white" p={6} rounded="md" shadow="md">
            <HousingRentalRecordDetailPanel record={selectedRecord} />
          </Box>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default withAuth(HousingRentalWorkbench);
