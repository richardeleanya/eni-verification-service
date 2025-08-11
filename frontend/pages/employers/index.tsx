import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Skeleton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import Layout from '../../components/Layout';
import VerifyModal from '../../components/VerifyModal';

type Employer = {
  id: number;
  companyName: string;
  verificationStatus: string;
  submittedAt?: string;
  verifiedAt?: string | null;
};

import withAuth from '../../hocs/withAuth';

const EmployersPage: React.FC = () => {
  ...
};

export default withAuth(EmployersPage);