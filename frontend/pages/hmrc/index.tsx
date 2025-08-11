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

type HmrcCase = {
  id: number;
  status: string;
  date?: string;
};

const HmrcListPage: React.FC = () => {
  const [cases, setCases] = useState<HmrcCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/hmrc')
      .then((res) => res.json())
      .then((data) => setCases(data))
      .catch(() => setCases([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <Heading size="lg" mb={6}>
        HMRC Cases
      </Heading>
      <Box bg="white" borderRadius="md" boxShadow="sm" p={4}>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Case ID</Th>
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
            ) : cases.length === 0 ? (
              <Tr>
                <Td colSpan={4} textAlign="center">
                  No cases found.
                </Td>
              </Tr>
            ) : (
              cases.map((c) => (
                <Tr key={c.id}>
                  <Td>{c.id}</Td>
                  <Td>{c.status}</Td>
                  <Td>
                    {c.date ? new Date(c.date).toLocaleString() : '-'}
                  </Td>
                  <Td>
                    <NextLink href={`/hmrc/${c.id}`} passHref>
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

export default withAuth(HmrcListPage);