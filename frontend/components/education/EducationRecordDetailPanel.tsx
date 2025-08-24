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

type EducationRecord = {
  id: number;
  studentName: string;
  institution: string;
  qualification: string;
  conferralDate: string;
  verificationStatus: string;
  submittedAt: string;
  verifiedAt: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

type Props = {
  record: EducationRecord | null;
};

const EducationRecordDetailPanel: React.FC<Props> = ({ record }) => {
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
        <Heading size="md">{record.studentName}</Heading>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={2} spacing={4}>
          <Text fontWeight="bold">Institution:</Text>
          <Text>{record.institution}</Text>
          <Text fontWeight="bold">Qualification:</Text>
          <Text>{record.qualification}</Text>
          <Text fontWeight="bold">Conferral Date:</Text>
          <Text>{record.conferralDate}</Text>
          <Text fontWeight="bold">Status:</Text>
          <Text>{record.verificationStatus}</Text>
          <Text fontWeight="bold">Submitted At:</Text>
          <Text>{record.submittedAt}</Text>
          <Text fontWeight="bold">Verified At:</Text>
          <Text>{record.verifiedAt || 'N/A'}</Text>
          <Text fontWeight="bold">Created By:</Text>
          <Text>{record.createdBy}</Text>
          <Text fontWeight="bold">Created At:</Text>
          <Text>{record.createdAt}</Text>
          <Text fontWeight="bold">Updated By:</Text>
          <Text>{record.updatedBy || 'N/A'}</Text>
          <Text fontWeight="bold">Updated At:</Text>
          <Text>{record.updatedAt || 'N/A'}</Text>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default EducationRecordDetailPanel;
