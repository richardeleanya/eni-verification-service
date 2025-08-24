import React from 'react';
import { Heading } from '@chakra-ui/react';
import AuditTrail from '../components/AuditTrail';
import withAuth from '../hocs/withAuth';

const AuditTrailPage = () => {
  return (
    <>
      <Heading mb={8}>Audit Trail</Heading>
      <AuditTrail />
    </>
  );
};

export default withAuth(AuditTrailPage);
