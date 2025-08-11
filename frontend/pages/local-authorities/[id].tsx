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

type LocalAuthorityRecord = {
  id: number;
  applicationId: string;
  status: string;
  date?: string;
};

const LocalAuthoritiesDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [rec, setRec] = useState<LocalAuthorityRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof id === 'string' && id.length > 0) {
      setLoading(true);
      fetch(`/api/local-authorities/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error('Not found');
          return res.json();
        })
        .then((data) => setRec(data))
        .catch(() => {
          setError('Record not found.');
          setRec(null);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <Layout>
      <Box mb={4}>
        <NextLink href="/local-authorities" passHref>
          <ChakraLink color="blue.600">&larr; Back to list</ChakraLink>
        </NextLink>
      </Box>
      <Heading size="lg" mb={4}>
        Local Authority Record Details
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
                <Td fontWeight="bold">Record ID</Td>
                <Td>{rec.applicationId}</Td>
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
            {/* Replace with actual audit entries if available */}
            <ListItem color="gray.500">No audit events yet.</ListItem>
          </List>
        </>
      ) : (
        <Text>No data.</Text>
      )}
    </Layout>
  );
};

export default withAuth(LocalAuthoritiesDetailPage);