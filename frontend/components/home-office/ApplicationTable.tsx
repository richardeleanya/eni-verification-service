import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Spinner,
  Text,
} from '@chakra-ui/react';

type Application = {
  id: number;
  applicantName: string;
  status: string;
  submittedAt: string;
};

const statusColor = (status: string) =>
  status === 'Approved'
    ? 'green'
    : status === 'Pending'
    ? 'yellow'
    : status === 'Rejected'
    ? 'red'
    : 'gray';

const ApplicationTable: React.FC = () => {
  const [data, setData] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/home-office/applications')
      .then((res) => res.json())
      .then((rows) => setData(rows))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box bg="white" borderRadius="md" boxShadow="sm" p={4}>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Application ID</Th>
            <Th>Applicant Name</Th>
            <Th>Status</Th>
            <Th>Submitted At</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Tr>
              <Td colSpan={4}><Spinner size="sm" /></Td>
            </Tr>
          ) : data.length === 0 ? (
            <Tr>
              <Td colSpan={4}><Text color="gray.500">No applications found.</Text></Td>
            </Tr>
          ) : (
            data.map((row) => (
              <Tr key={row.id}>
                <Td>{row.id}</Td>
                <Td>{row.applicantName}</Td>
                <Td>
                  <Badge colorScheme={statusColor(row.status)}>{row.status}</Badge>
                </Td>
                <Td>
                  {row.submittedAt
                    ? new Date(row.submittedAt).toLocaleDateString() +
                      ' ' +
                      new Date(row.submittedAt).toLocaleTimeString()
                    : '-'}
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ApplicationTable;