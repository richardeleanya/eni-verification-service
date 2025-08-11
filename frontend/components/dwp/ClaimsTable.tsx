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
  Editable,
  EditableInput,
  EditablePreview,
  useToast,
} from '@chakra-ui/react';

type Claim = {
  id: number;
  applicationId: string;
  status: string;
  date?: string;
};

const statusColor = (status: string) =>
  status === 'Active'
    ? 'yellow'
    : status === 'Closed'
    ? 'green'
    : 'gray';

type ClaimsTableProps = {
  onSelect?: (id: number) => void;
  selectedId?: number | null;
};

const ClaimsTable: React.FC<ClaimsTableProps> = ({ onSelect, selectedId }) => {
  const [data, setData] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    setLoading(true);
    fetch('/api/dwp')
      .then((res) => res.json())
      .then((rows) => setData(rows))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id: number, nextStatus: string) => {
    const prev = data.find((row) => row.id === id)?.status;
    if (!nextStatus || nextStatus === prev) return;
    // Optimistic UI update
    setData((cur) =>
      cur.map((row) =>
        row.id === id ? { ...row, status: nextStatus } : row
      )
    );
    try {
      const res = await fetch(`/api/dwp/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (!res.ok) throw new Error();
      toast({
        title: 'Status updated.',
        status: 'success',
        duration: 1500,
        isClosable: true,
      });
    } catch {
      // Rollback UI
      setData((cur) =>
        cur.map((row) =>
          row.id === id ? { ...row, status: prev ?? row.status } : row
        )
      );
      toast({
        title: 'Failed to update status.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="white" borderRadius="md" boxShadow="sm" p={4}>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Application ID</Th>
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
              <Td colSpan={3}><Text color="gray.500">No claims found.</Text></Td>
            </Tr>
          ) : (
            data.map((row) => (
              <Tr
                key={row.id}
                _hover={{ bg: 'gray.50', cursor: onSelect ? 'pointer' : undefined }}
                bg={selectedId === row.id ? 'blue.50' : undefined}
                onClick={onSelect ? () => onSelect(row.id) : undefined}
              >
                <Td>{row.applicationId}</Td>
                <Td onClick={e => e.stopPropagation()}>
                  <Editable
                    defaultValue={row.status}
                    fontWeight="bold"
                    onSubmit={nextStatus => handleStatusChange(row.id, nextStatus)}
                  >
                    <EditablePreview
                      as={Badge}
                      colorScheme={statusColor(row.status)}
                      cursor="pointer"
                    />
                    <EditableInput />
                  </Editable>
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

export default ClaimsTable;