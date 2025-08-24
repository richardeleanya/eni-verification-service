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
import { InsuranceRecord } from '../../types';

type Props = {
  records: InsuranceRecord[];
  onVerify: (id: number) => void;
  onRowClick: (record: InsuranceRecord) => void;
};

const InsuranceRecordTable: React.FC<Props> = ({ records, onVerify, onRowClick }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Policy Holder Name</Th>
          <Th>Policy Number</Th>
          <Th>Policy Type</Th>
          <Th>Coverage Amount</Th>
          <Th>Status</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {records.map(record => (
          <Tr key={record.id} onClick={() => onRowClick(record)} _hover={{ bg: 'gray.100', cursor: 'pointer' }}>
            <Td>{record.policyHolderName}</Td>
            <Td>{record.policyNumber}</Td>
            <Td>{record.policyType}</Td>
            <Td>${record.coverageAmount.toFixed(2)}</Td>
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

export default InsuranceRecordTable;
