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

type Transaction = {
  id: number;
  status: string;
  date?: string;
};

const statusColor = (status: string) =>
  status === 'Active'
    ? 'yellow'
    : status === 'Closed'
    ? 'green'
    : 'gray';

type TransactionTableProps = {
  onSelect?: (id: number) => void;
  selectedId?: number | null;
};

const TransactionTable: React.FC<TransactionTableProps> = ({ onSelect, selectedId }) => {
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/hmrc')
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
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Tr>
              <Td colSpan={3}><Spinner size="sm" /></Td>
            </Tr>
          ) : data.length === 0 ? (
            <Tr>
              <Td colSpan={3}><Text color="gray.500">No cases found.</Text></Td>
            </Tr>
          ) : (
            data.map((row) => (
              <Tr
                key={row.id}
                _hover={{ bg: 'gray.50', cursor: onSelect ? 'pointer' : undefined }}
                bg={selectedId === row.id ? 'blue.50' : undefined}
                onClick={onSelect ? () => onSelect(row.id) : undefined}
              >
                <Td>{row.id}</Td>
                <Td>
                  <Badge colorScheme={statusColor(row.status)}>{row.status}</Badge>
                </Td>
                <Td>
                  {row.date
                    ? new Date(row.date).toLocaleDateString() +
                      ' ' +
                      new Date(row.date).toLocaleTimeString()
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

export default TransactionTable;