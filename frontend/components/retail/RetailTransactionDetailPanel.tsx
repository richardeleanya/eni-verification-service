import React from 'react';
import {
  Box,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
} from '@chakra-ui/react';
import { RetailTransaction } from '../../types';

type Props = {
  record: RetailTransaction | null;
};

const RetailTransactionDetailPanel: React.FC<Props> = ({ record }) => {
  if (!record) {
    return (
      <Box p={4} borderWidth="1px" borderRadius="lg">
        <Text>Select a transaction to see details</Text>
      </Box>
    );
  }

  return (
    <Card>
      <CardHeader>
        <Heading size="md">{record.customerName}</Heading>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={2} spacing={4}>
          <Text fontWeight="bold">Product:</Text>
          <Text>{record.product}</Text>
          <Text fontWeight="bold">Amount:</Text>
          <Text>${record.amount.toFixed(2)}</Text>
          <Text fontWeight="bold">Transaction Date:</Text>
          <Text>{record.transactionDate}</Text>
          <Text fontWeight="bold">Status:</Text>
          <Text>{record.verificationStatus}</Text>
          <Text fontWeight="bold">Submitted At:</Text>
          <Text>{record.submittedAt}</Text>
          <Text fontWeight="bold">Verified At:</Text>
          <Text>{record.verifiedAt || 'N/A'}</Text>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default RetailTransactionDetailPanel;
