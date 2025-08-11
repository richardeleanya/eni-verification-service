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

type Incident = {
  id: number;
  caseId: string;
  status: string;
  reportedAt?: string;
};

const statusColor = (status: string) =>
  status === 'Active'
    ? 'yellow'
    : status === 'Closed'
    ? 'green'
    : 'gray';

type IncidentTableProps = {
  onSelect?: (id: number) => void;
  selectedId?: number | null;
};

const IncidentTable: React.FC<IncidentTableProps> = ({ onSelect, selectedId }) => {
  const [data, setData] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/police')
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
            <Th>Case ID</Th>
            <Th>Status</Th>
            <Th>Reported At</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Tr>
              <Td colSpan={3}><Spinner size="sm" /></Td>
            </Tr>
          ) : data.length === 0 ? (
            <Tr>
              <Td colSpan={3}><Text color="gray.500">No incidents found.</Text></Td>
            </Tr>
          ) : (
            data.map((row) => (
              <Tr
                key={row.id}
                _hover={{ bg: 'gray.50', cursor: onSelect ? 'pointer' : undefined }}
                bg={selectedId === row.id ? 'blue.50' : undefined}
                onClick={onSelect ? () => onSelect(row.id) : undefined}
              >
                <Td>{row.caseId}</Td>
                <Td>
                  <Badge colorScheme={statusColor(row.status)}>{row.status}</Badge>
                </Td>
                <Td>
                  {row.reportedAt
                    ? new Date(row.reportedAt).toLocaleDateString() +
                      ' ' +
                      new Date(row.reportedAt).toLocaleTimeString()
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

export default IncidentTable;