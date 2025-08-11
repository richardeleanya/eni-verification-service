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

type EmployerResponse = {
  id: number;
  companyName: string;
  verificationStatus: string;
  submittedAt?: string;
  verifiedAt?: string | null;
};

const EmployerDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [employer, setEmployer] = useState<EmployerResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof id === 'string' && id.length > 0) {
      setLoading(true);
      fetch(`/api/employers/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error('Not found');
          return res.json();
        })
        .then((data) => setEmployer(data))
        .catch(() => {
          setError('Employer not found.');
          setEmployer(null);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <Layout>
      <Box mb={4}>
        <NextLink href="/employers" passHref>
          <ChakraLink color="blue.600">&larr; Back to list</ChakraLink>
        </NextLink>
      </Box>
      <Heading size="lg" mb={4}>
        Employer Details
      </Heading>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : employer ? (
        <>
          <Table variant="simple" maxW="500px" mb={4}>
            <Tbody>
              <Tr>
                <Td fontWeight="bold">Company Name</Td>
                <Td>{employer.companyName}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Verification Status</Td>
                <Td>{employer.verificationStatus}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Submitted At</Td>
                <Td>
                  {employer.submittedAt
                    ? new Date(employer.submittedAt).toLocaleString()
                    : '-'}
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Verified At</Td>
                <Td>
                  {employer.verifiedAt
                    ? new Date(employer.verifiedAt).toLocaleString()
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

export default EmployerDetailPage;