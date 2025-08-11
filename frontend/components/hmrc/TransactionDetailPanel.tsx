import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  CartesianGrid,
} from 'recharts';

type TransactionDetailPanelProps = {
  transactionId: number | null;
};

const data = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 55 },
  { name: 'Mar', value: 70 },
];

const TransactionDetailPanel: React.FC<TransactionDetailPanelProps> = ({ transactionId }) => (
  <Box bg="white" borderRadius="md" boxShadow="sm" p={4} minH="250px">
    <Heading size="sm" mb={2}>
      Transaction Detail
    </Heading>
    {transactionId == null ? (
      <Text color="gray.400">Select a case to view details.</Text>
    ) : (
      <>
        <Box borderRadius="md" h="200px" mb={3} overflow="hidden">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3182ce" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Text color="gray.600">
          Details for transaction ID <b>{transactionId}</b> would appear here.
        </Text>
      </>
    )}
  </Box>
);

export default TransactionDetailPanel;