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
import { HousingRentalRecord } from '../../types';

type Props = {
  record: HousingRentalRecord | null;
};

const HousingRentalRecordDetailPanel: React.FC<Props> = ({ record }) => {
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
        <Heading size="md">{record.tenantName}</Heading>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={2} spacing={4}>
          <Text fontWeight="bold">Property Address:</Text>
          <Text>{record.propertyAddress}</Text>
          <Text fontWeight="bold">Lease Start Date:</Text>
          <Text>{record.leaseStartDate}</Text>
          <Text fontWeight="bold">Lease End Date:</Text>
          <Text>{record.leaseEndDate}</Text>
          <Text fontWeight="bold">Rent Amount:</Text>
          <Text>${record.rentAmount.toFixed(2)}</Text>
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

export default HousingRentalRecordDetailPanel;
