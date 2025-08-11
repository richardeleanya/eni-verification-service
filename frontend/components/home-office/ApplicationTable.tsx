import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
} from '@chakra-ui/react';

const stubData = [
  {
    id: 'APP-1001',
    name: 'Aliya Khan',
    status: 'Pending',
    submittedAt: '2025-08-10T10:24:00Z',
  },
  {
    id: 'APP-1002',
    name: 'John Doe',
    status: 'Approved',
    submittedAt: '2025-07-08T15:00:00Z',
  },
  {
    id: 'APP-1003',
    name: 'Maria Silva',
    status: 'Rejected',
    submittedAt: '2025-06-12T09:30:00Z',
  },
];

const statusColor = (status: string) =>
  status === 'Approved'
    ? 'green'
    : status === 'Pending'
    ? 'yellow'
    : status === 'Rejected'
    ? 'red'
    : 'gray';

const ApplicationTable: React.FC = () => (
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
        {stubData.map((row) => (
          <Tr key={row.id}>
            <Td>{row.id}</Td>
            <Td>{row.name}</Td>
            <Td>
              <Badge colorScheme={statusColor(row.status)}>{row.status}</Badge>
            </Td>
            <Td>
              {new Date(row.submittedAt).toLocaleDateString() +
                ' ' +
                new Date(row.submittedAt).toLocaleTimeString()}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Box>
);

export default ApplicationTable;