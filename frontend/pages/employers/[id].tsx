import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Spinner,
  Table,
  Tbody,
  Tr,
  Td,
  Link as ChakraLink,
  Divider,
  List,
  ListItem,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Layout from '../../components/Layout';

type EmployerResponse = {
  id: number;
  companyName: string;
  verificationStatus: string;
  submittedAt?: string;
  verifiedAt?: string | null;
};

import withAuth from '../../hocs/withAuth';

const EmployerDetailPage: React.FC = () => {
  ...
};

export default withAuth(EmployerDetailPage);