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

type HmrcCase = {
  id: number;
  status: string;
  date?: string;
};

const HmrcCaseDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [caseData, setCaseData] = useState<HmrcCase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof id === 'string' && id.length > 0) {
      setLoading(true);
      fetch(`/api/hmrc/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error('Not found');
          return res.json();
        })
        .then((data) => setCaseData(data))
        .catch(() => {
          setError('Case not found.');
          setCaseData(null);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <Layout>
      <Box mb={4}>
        <NextLink href="/hmrc" passHref>
          <ChakraLink color="blue.600">&larr; Back to list</ChakraLink>
        </NextLink>
      </Box>
      <Heading size="lg" mb={4}>
        HMRC Case Details
      </Heading>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : caseData ? (
        <>
          <Table variant="simple" maxW="500px" mb={4}>
            <Tbody>
              <Tr>
                <Td fontWeight="bold">Case ID</Td>
                <Td>{caseData.id}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Status</Td>
                <Td>{caseData.status}</Td>
              </Tr>
              <Tr>
                <Td fontWeight="bold">Date</Td>
                <Td>
                  {caseData.date
                    ? new Date(caseData.date).toLocaleString()
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

export default withAuth(HmrcCaseDetailPage);