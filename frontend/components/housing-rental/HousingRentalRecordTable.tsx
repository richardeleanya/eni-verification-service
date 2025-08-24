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
import { HousingRentalRecord } from '../../types';

type Props = {
  records: HousingRentalRecord[];
  onVerify: (id: number) => void;
  onRowClick: (record: HousingRentalRecord) => void;
};

const HousingRentalRecordTable: React.FC<Props> = ({ records, onVerify, onRowClick }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Tenant Name</Th>
          <Th>Property Address</Th>
          <Th>Lease End Date</Th>
          <Th>Rent Amount</Th>
          <Th>Status</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {records.map(record => (
          <Tr key={record.id} onClick={() => onRowClick(record)} _hover={{ bg: 'gray.100', cursor: 'pointer' }}>
            <Td>{record.tenantName}</Td>
            <Td>{record.propertyAddress}</Td>
            <Td>{record.leaseEndDate}</Td>
            <Td>${record.rentAmount.toFixed(2)}</Td>
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

export default HousingRentalRecordTable;
