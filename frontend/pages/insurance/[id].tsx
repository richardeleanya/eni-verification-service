import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
} from '@chakra-ui/react';
import Layout from '../../components/Layout';
import withAuth from '../../hocs/withAuth';
import { InsuranceRecord } from '../../types';

const InsuranceRecordDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [record, setRecord] = useState<InsuranceRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchRecord = async () => {
        try {
          const response = await fetch(`/api/integrations/insurance/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch insurance record');
          }
          const data = await response.json();
          setRecord(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchRecord();
    }
  }, [id]);

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

  if (!record) {
    return (
      <Layout>
        <Text>Record not found.</Text>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading size="lg" mb={4}>
        Insurance Record Details
      </Heading>
      <Card>
        <CardHeader>
          <Heading size="md">{record.policyHolderName}</Heading>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={2} spacing={4}>
            <Text fontWeight="bold">Policy Number:</Text>
            <Text>{record.policyNumber}</Text>
            <Text fontWeight="bold">Policy Type:</Text>
            <Text>{record.policyType}</Text>
            <Text fontWeight="bold">Coverage Amount:</Text>
            <Text>${record.coverageAmount.toFixed(2)}</Text>
            <Text fontWeight="bold">Status:</Text>
            <Text>{record.verificationStatus}</Text>
            <Text fontWeight="bold">Submitted At:</Text>
            <Text>{record.submittedAt}</Text>
            <Text fontWeight="bold">Verified At:</Text>
            <Text>{record.verifiedAt || 'N/A'}</Text>
          </SimpleGrid>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default withAuth(InsuranceRecordDetailPage);
