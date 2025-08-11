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
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Layout from '../../components/Layout';
import withAuth from '../../hocs/withAuth';

type LocalAuthorityRecord = {
  id: number;
  applicationId: string;
  status: string;
  date?: string;
};

const LocalAuthoritiesListPage: React.FC = () => {
  const [records, setRecords] = useState<LocalAuthorityRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/local-authorities')
      .then((res) => res.json())
      .then((data) => setRecords(data))
      .catch(() => setRecords([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <Heading size="lg" mb={6}>
        Local Authorities Records
      </Heading>
      <Box bg="white" borderRadius="md" boxShadow="sm" p={4}>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Record ID</Th>
              <Th>Status</Th>
              <Th>Date</Th>
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
              records.map((rec) => (
                <Tr key={rec.id}>
                  <Td>{rec.applicationId}</Td>
                  <Td>{rec.status}</Td>
                  <Td>
                    {rec.date ? new Date(rec.date).toLocaleString() : '-'}
                  </Td>
                  <Td>
                    <NextLink href={`/local-authorities/${rec.id}`} passHref>
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

export default withAuth(LocalAuthoritiesListPage);