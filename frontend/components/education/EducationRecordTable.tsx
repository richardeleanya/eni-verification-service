import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from '@chakra-ui/react';

type EducationRecord = {
  id: number;
  studentName: string;
  institution: string;
  qualification: string;
  conferralDate: string;
  verificationStatus: string;
};

type Props = {
  records: EducationRecord[];
  onVerify: (id: number) => void;
  onRowClick: (record: EducationRecord) => void;
};

const EducationRecordTable: React.FC<Props> = ({ records, onVerify, onRowClick }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Student Name</Th>
          <Th>Institution</Th>
          <Th>Qualification</Th>
          <Th>Conferral Date</Th>
          <Th>Status</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {records.map(record => (
          <Tr key={record.id} onClick={() => onRowClick(record)} _hover={{ bg: 'gray.100', cursor: 'pointer' }}>
            <Td>{record.studentName}</Td>
            <Td>{record.institution}</Td>
            <Td>{record.qualification}</Td>
            <Td>{record.conferralDate}</Td>
            <Td>{record.verificationStatus}</Td>
            <Td>
              {record.verificationStatus === 'PENDING' && (
                <Button size="sm" onClick={(e) => { e.stopPropagation(); onVerify(record.id); }}>
                  Verify
                </Button>
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default EducationRecordTable;
