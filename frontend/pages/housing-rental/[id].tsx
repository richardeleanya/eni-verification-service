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
import { HousingRentalRecord } from '../../types';

const HousingRentalRecordDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [record, setRecord] = useState<HousingRentalRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchRecord = async () => {
        try {
          const response = await fetch(`/api/integrations/housing-rental/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch housing rental record');
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
        Housing & Rental Record Details
      </Heading>
      <Card>
        <CardHeader>
          <Heading size="md">{record.tenantName}</Heading>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={2} spacing={4}>
            <Text fontWeight="bold">Property Address:</Text>
            <Text>{record.propertyAddress}</Text>
            <Text fontWeight="bold">Lease Start Date:</Text>
            <Text>{record.leaseStartDate}</Text>
            <Text fontWeight="bold">Lease End Date:</Text>
            <Text>{record.leaseEndDate}</Text>
            <Text fontWeight="bold">Rent Amount:</Text>
            <Text>${record.rentAmount.toFixed(2)}</Text>
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

export default withAuth(HousingRentalRecordDetailPage);
