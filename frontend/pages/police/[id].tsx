import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Spinner,
  Table,
  Tbody,
  Tr,
  Td,
  Link as ChakraLink,
  Divider,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Layout from '../../components/Layout';
import withAuth from '../../hocs/withAuth';
import AuditTrail from '../../components/AuditTrail';

type PoliceRecordResponse = {
  id: number;
  caseId: string;
  status: string;
  reportedAt?: string;
};

const PoliceRecordDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [record, setRecord] = useState<PoliceRecordResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof id === 'string' && id.length > 0) {
      setLoading(true);
      fetch(`/api/police/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error('Not found');
          return res.json();
        })
        .then((data) => setRecord(data))
        .catch(() => {
          setError('Police record not found.');
          setRecord(null);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <Layout>
      <Box mb={4}>
        <NextLink href="/police" passHref>
          <ChakraLink color="blue.600">&larr; Back to list</ChakraLink>
        </NextLink>
      </Box>
      <Heading size="lg" mb={4}>
        Police Record Details
      </Heading>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : record ? (
        <>
          <Table variant="simple" maxW="500px" mb={4}>
            <Tbody>
              <Tr>
                <Td fontWeight="bold">Case ID</Td>
                <Td>{record.caseId}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Status</Td>
                <Td>{record.status}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Reported At</Td>
                <Td>
                  {record.reportedAt
                    ? new Date(record.reportedAt).toLocaleString()
                    : '-'}
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Divider my={6} />
          <Heading size="md" mb={2}>
            Audit Trail
          </Heading>
          {typeof id === 'string' && (
            <AuditTrail domain="police" entityId={parseInt(id)} />
          )}
        </>
      ) : (
        <Text>No data.</Text>
      )}
    </Layout>
  );
};

export default withAuth(PoliceRecordDetailPage);