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

type NhsAppointment = {
  id: number;
  appointmentId: string;
  status: string;
  date?: string;
};

const NhsListPage: React.FC = () => {
  const [apps, setApps] = useState<NhsAppointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/nhs')
      .then((res) => res.json())
      .then((data) => setApps(data))
      .catch(() => setApps([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <Heading size="lg" mb={6}>
        NHS Appointments
      </Heading>
      <Box bg="white" borderRadius="md" boxShadow="sm" p={4}>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Appointment ID</Th>
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
            ) : apps.length === 0 ? (
              <Tr>
                <Td colSpan={4} textAlign="center">
                  No appointments found.
                </Td>
              </Tr>
            ) : (
              apps.map((a) => (
                <Tr key={a.id}>
                  <Td>{a.appointmentId}</Td>
                  <Td>{a.status}</Td>
                  <Td>
                    {a.date ? new Date(a.date).toLocaleString() : '-'}
                  </Td>
                  <Td>
                    <NextLink href={`/nhs/${a.id}`} passHref>
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

export default withAuth(NhsListPage);