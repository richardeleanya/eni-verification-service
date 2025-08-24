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

const EducationRecordDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [record, setRecord] = useState<EducationRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchRecord = async () => {
        try {
          const response = await fetch(`/api/integrations/education/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch education record');
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
        Education Record Details
      </Heading>
      <Card>
        <CardHeader>
          <Heading size="md">{record.studentName}</Heading>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={2} spacing={4}>
            <Text fontWeight="bold">Institution:</Text>
            <Text>{record.institution}</Text>
            <Text fontWeight="bold">Qualification:</Text>
            <Text>{record.qualification}</Text>
            <Text fontWeight="bold">Conferral Date:</Text>
            <Text>{record.conferralDate}</Text>
            <Text fontWeight="bold">Status:</Text>
            <Text>{record.verificationStatus}</Text>
            <Text fontWeight="bold">Submitted At:</Text>
            <Text>{record.submittedAt}</Text>
            <Text fontWeight="bold">Verified At:</Text>
            <Text>{record.verifiedAt || 'N/A'}</Text>
            <Text fontWeight="bold">Created By:</Text>
            <Text>{record.createdBy}</Text>
            <Text fontWeight="bold">Created At:</Text>
            <Text>{record.createdAt}</Text>
            <Text fontWeight="bold">Updated By:</Text>
            <Text>{record.updatedBy || 'N/A'}</Text>
            <Text fontWeight="bold">Updated At:</Text>
            <Text>{record.updatedAt || 'N/A'}</Text>
          </SimpleGrid>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default withAuth(EducationRecordDetailPage);
