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

type FinancialTransaction = {
  id: number;
  transactionId: string;
  status: string;
  date?: string;
};

const FinancialServicesListPage: React.FC = () => {
  const [records, setRecords] = useState<FinancialTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/financial-services')
      .then((res) => res.json())
      .then((data) => setRecords(data))
      .catch(() => setRecords([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <Heading size="lg" mb={6}>
        Financial Transactions
      </Heading>
      <Box bg="white" borderRadius="md" boxShadow="sm" p={4}>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Transaction ID</Th>
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
                  No transactions found.
                </Td>
              </Tr>
            ) : (
              records.map((rec) => (
                <Tr key={rec.id}>
                  <Td>{rec.transactionId}</Td>
                  <Td>{rec.status}</Td>
                  <Td>
                    {rec.date ? new Date(rec.date).toLocaleString() : '-'}
                  </Td>
                  <Td>
                    <NextLink href={`/financial-services/${rec.id}`} passHref>
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

export default withAuth(FinancialServicesListPage);