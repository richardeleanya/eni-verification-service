import React from 'react';
import { List, ListItem, Badge, Text, HStack, Spinner } from '@chakra-ui/react';

type AuditEntry = {
  action: string;
  by: string;
  at: string;
};
type Props = {
  entries: AuditEntry[];
  loading?: boolean;
};

const AuditTrail: React.FC<Props> = ({ entries, loading }) => {
  if (loading) return <Spinner size="sm" />;
  if (!entries || entries.length === 0)
    return <ListItem color="gray.500">No audit events yet.</ListItem>;

  return (
    <List spacing={2}>
      {entries.map((entry, i) => (
        <ListItem key={i}>
          <HStack spacing={3}>
            <Badge colorScheme={
              entry.action === 'CREATED'
                ? 'blue'
                : entry.action === 'VERIFIED' || entry.action === 'REVIEWED'
                ? 'green'
                : entry.action === 'CLOSED'
                ? 'purple'
                : 'gray'
            }>
              {entry.action}
            </Badge>
            <Text>
              by <b>{entry.by}</b> at{' '}
              {entry.at ? new Date(entry.at).toLocaleString() : '-'}
            </Text>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default AuditTrail;