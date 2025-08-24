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
import { InsuranceRecord } from '../../types';

type Props = {
  record: InsuranceRecord | null;
};

const InsuranceRecordDetailPanel: React.FC<Props> = ({ record }) => {
  if (!record) {
    return (
      <Box p={4} borderWidth="1px" borderRadius="lg">
        <Text>Select a record to see details</Text>
      </Box>
    );
  }

  return (
    <Card>
      <CardHeader>
        <Heading size="md">{record.policyHolderName}</Heading>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={2} spacing={4}>
          <Text fontWeight="bold">Policy Number:</Text>
          <Text>{record.policyNumber}</Text>
          <Text fontWeight="bold">Policy Type:</Text>
          <Text>{record.policyType}</Text>
          <Text fontWeight="bold">Coverage Amount:</Text>
          <Text>${record.coverageAmount.toFixed(2)}</Text>
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

export default InsuranceRecordDetailPanel;
