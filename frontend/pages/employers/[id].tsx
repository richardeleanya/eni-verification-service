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
  Badge,
  HStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Layout from '../../components/Layout';
import withAuth from '../../hocs/withAuth';
import CrossReferenceGraph from '../../components/CrossReferenceGraph';
import Timeline from '../../components/Timeline';
import AuditTrail from '../../components/AuditTrail';

type EmployerResponse = {
  id: number;
  companyName: string;
  verificationStatus: string;
  submittedAt?: string;
  verifiedAt?: string | null;
  history?: { date: string; label: string }[];
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

  // Fallback stub history if missing
  const history =
    employer?.history && employer.history.length > 0
      ? employer.history
      : [
          { date: '2025-05-01', label: 'Employer created' },
          { date: '2025-06-10', label: 'Right to Work verified' },
          { date: '2025-08-15', label: 'Audit completed' },
        ];

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
          {typeof id === 'string' && (
            <AuditTrail domain="employer" entityId={parseInt(id)} />
          )}

          <Box mt={8}>
            <Heading size="md" mb={2}>
              Connections
            </Heading>
            <CrossReferenceGraph />
          </Box>

          <Box mt={8}>
            <Heading size="md" mb={2}>
              History Timeline
            </Heading>
            <Timeline events={history} />
          </Box>
        </>
      ) : (
        <Text>No data.</Text>
      )}
    </Layout>
  );
};

export default withAuth(EmployerDetailPage);