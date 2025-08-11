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
  List,
  ListItem,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Layout from '../../components/Layout';
import withAuth from '../../hocs/withAuth';

type FinancialTransaction = {
  id: number;
  transactionId: string;
  status: string;
  date?: string;
};

const FinancialDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [rec, setRec] = useState<FinancialTransaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof id === 'string' && id.length > 0) {
      setLoading(true);
      fetch(`/api/financial-services/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error('Not found');
          return res.json();
        })
        .then((data) => setRec(data))
        .catch(() => {
          setError('Transaction not found.');
          setRec(null);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <Layout>
      <Box mb={4}>
        <NextLink href="/financial-services" passHref>
          <ChakraLink color="blue.600">&larr; Back to list</ChakraLink>
        </NextLink>
      </Box>
      <Heading size="lg" mb={4}>
        Financial Transaction Details
      </Heading>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : rec ? (
        <>
          <Table variant="simple" maxW="500px" mb={4}>
            <Tbody>
              <Tr>
                <Td fontWeight="bold">Transaction ID</Td>
                <Td>{rec.transactionId}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Status</Td>
                <Td>{rec.status}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Date</Td>
                <Td>
                  {rec.date
                    ? new Date(rec.date).toLocaleString()
                    : '-'}
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Divider my={6} />
          <Heading size="md" mb={2}>
            Audit Trail
          </Heading>
          <List spacing={2}>
            <ListItem color="gray.500">No audit events yet.</ListItem>
          </List>
        </>
      ) : (
        <Text>No data.</Text>
      )}
    </Layout>
  );
};

export default withAuth(FinancialDetailPage);