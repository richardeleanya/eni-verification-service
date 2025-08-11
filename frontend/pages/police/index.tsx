import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Skeleton,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Layout from '../../components/Layout';
import withAuth from '../../hocs/withAuth';

type PoliceRecord = {
  id: number;
  caseId: string;
  status: string;
  reportedAt?: string;
};

const PoliceListPage: React.FC = () => {
  const [records, setRecords] = useState<PoliceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/police')
      .then((res) => res.json())
      .then((data) => setRecords(data))
      .catch(() => setRecords([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <Heading size="lg" mb={6}>
        Police Records
      </Heading>
      <Box bg="white" borderRadius="md" boxShadow="sm" p={4}>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Case ID</Th>
              <Th>Status</Th>
              <Th>Reported At</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <Tr>
                <Td colSpan={4}>
                  <Spinner size="sm" />
                </Td>
              </Tr>
            ) : records.length === 0 ? (
              <Tr>
                <Td colSpan={4} textAlign="center">
                  No records found.
                </Td>
              </Tr>
            ) : (
              records.map((record) => (
                <Tr key={record.id}>
                  <Td>{record.caseId}</Td>
                  <Td>{record.status}</Td>
                  <Td>
                    {record.reportedAt
                      ? new Date(record.reportedAt).toLocaleString()
                      : '-'}
                  </Td>
                  <Td>
                    <NextLink href={`/police/${record.id}`} passHref>
                      <Button as="a" size="sm" colorScheme="blue" variant="outline">
                        View
                      </Button>
                    </NextLink>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>
    </Layout>
  );
};

export default withAuth(PoliceListPage);