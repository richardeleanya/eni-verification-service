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
import { RetailTransaction } from '../../types';

type Props = {
  records: RetailTransaction[];
  onVerify: (id: number) => void;
  onRowClick: (record: RetailTransaction) => void;
};

const RetailTransactionTable: React.FC<Props> = ({ records, onVerify, onRowClick }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Customer Name</Th>
          <Th>Product</Th>
          <Th>Amount</Th>
          <Th>Transaction Date</Th>
          <Th>Status</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {records.map(record => (
          <Tr key={record.id} onClick={() => onRowClick(record)} _hover={{ bg: 'gray.100', cursor: 'pointer' }}>
            <Td>{record.customerName}</Td>
            <Td>{record.product}</Td>
            <Td>${record.amount.toFixed(2)}</Td>
            <Td>{record.transactionDate}</Td>
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

export default RetailTransactionTable;
