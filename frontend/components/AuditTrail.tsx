import React, { useEffect, useState, useMemo } from 'react';
import {
  List,
  ListItem,
  Badge,
  Text,
  HStack,
  Spinner,
  Button,
  Select,
  Box,
} from '@chakra-ui/react';

type AuditEntry = {
  id: number;
  action: string;
  performedBy: string;
  timestamp: string;
};

type Props = {
  domain: string;
  entityId: number | string;
  pageSize?: number;
};

const actionColor = (action: string) => {
  switch (action) {
    case 'CREATED':
      return 'blue';
    case 'VERIFIED':
    case 'REVIEWED':
      return 'green';
    case 'REJECTED':
      return 'red';
    case 'UPDATED':
      return 'teal';
    case 'CLOSED':
      return 'purple';
    default:
      return 'gray';
  }
};

const AuditTrail: React.FC<Props> = ({ domain, entityId, pageSize = 5 }) => {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterAction, setFilterAction] = useState<string>('ALL');
  const [availableActions, setAvailableActions] = useState<string[]>([]);

  useEffect(() => {
    setEntries([]);
    setPage(0);
  }, [domain, entityId, filterAction]);

  useEffect(() => {
    setLoading(true);
    const params = [
      `domain=${encodeURIComponent(domain)}`,
      `entityId=${encodeURIComponent(entityId)}`,
      `page=${page}`,
      `size=${pageSize}`,
    ];
    fetch('/api/audit?' + params.join('&'))
      .then((res) => res.json())
      .then((result) => {
        // result.content: Array, result.totalElements: number
        let newEntries = result.content;
        if (filterAction !== 'ALL') {
          newEntries = newEntries.filter(
            (entry: AuditEntry) => entry.action === filterAction
          );
        }
        setAvailableActions([
          ...new Set([
            ...availableActions,
            ...result.content.map((e: AuditEntry) => e.action),
          ]),
        ]);
        if (page === 0) {
          setEntries(newEntries);
        } else {
          setEntries((prev) => [...prev, ...newEntries]);
        }
        setTotalCount(result.totalElements);
      })
      .catch(() => {
        setEntries([]);
        setTotalCount(0);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
    // availableActions intentionally omitted from deps to avoid infinite loop
    // eslint-disable-next-line
  }, [domain, entityId, page, filterAction, pageSize]);

  // For dropdown, show all unique actions in loaded entries
  const actionsForDropdown = useMemo(() => {
    const found = new Set(entries.map((e) => e.action));
    return ['ALL', ...Array.from(found)];
  }, [entries]);

  return (
    <Box>
      <HStack mb={2}>
        <Text fontWeight="medium">Filter:</Text>
        <Select
          size="sm"
          width="140px"
          value={filterAction}
          onChange={(e) => {
            setFilterAction(e.target.value);
            setPage(0);
          }}
        >
          {actionsForDropdown.map((action) => (
            <option key={action} value={action}>
              {action === 'ALL' ? 'All Actions' : action}
            </option>
          ))}
        </Select>
      </HStack>
      {loading && page === 0 ? (
        <Spinner size="sm" />
      ) : !entries || entries.length === 0 ? (
        <List><ListItem color="gray.500">No audit events yet.</ListItem></List>
      ) : (
        <List spacing={2}>
          {entries.map((entry) => (
            <ListItem key={entry.id}>
              <HStack spacing={3}>
                <Badge colorScheme={actionColor(entry.action)}>
                  {entry.action}
                </Badge>
                <Text>
                  by <b>{entry.performedBy}</b> at{' '}
                  {entry.timestamp
                    ? new Date(entry.timestamp).toLocaleString()
                    : '-'}
                </Text>
              </HStack>
            </ListItem>
          ))}
        </List>
      )}
      {entries.length < totalCount && (
        <Button
          mt={3}
          size="sm"
          onClick={() => setPage((p) => p + 1)}
          isLoading={loading}
        >
          Load More
        </Button>
      )}
    </Box>
  );
};

export default AuditTrail;