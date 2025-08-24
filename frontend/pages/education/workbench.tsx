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
import EducationRecordTable from '../../components/education/EducationRecordTable';
import EducationRecordDetailPanel from '../../components/education/EducationRecordDetailPanel';

type EducationRecord = {
  id: number;
  studentName: string;
  institution: string;
  qualification: string;
  conferralDate: string;
  verificationStatus: string;
  submittedAt: string;
  verifiedAt: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

const EducationWorkbench: React.FC = () => {
  const [records, setRecords] = useState<EducationRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<EducationRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch('/api/integrations/education');
        if (!response.ok) {
          throw new Error('Failed to fetch education records');
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
      const response = await fetch(`/api/integrations/education/${id}/verify`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to verify education record');
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

  const handleRowClick = (record: EducationRecord) => {
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
        Education Workbench
      </Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem colSpan={2}>
          <Box bg="white" p={6} rounded="md" shadow="md">
            <EducationRecordTable records={records} onVerify={handleVerify} onRowClick={handleRowClick} />
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Box bg="white" p={6} rounded="md" shadow="md">
            <EducationRecordDetailPanel record={selectedRecord} />
          </Box>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default withAuth(EducationWorkbench);
