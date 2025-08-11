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

const EmployersPage: React.FC = () => {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // For verify modal
  const {
    isOpen: isVerifyOpen,
    onOpen: openVerifyModal,
    onClose: closeVerifyModal,
  } = useDisclosure();
  const [selectedEmployerId, setSelectedEmployerId] = useState<number | null>(null);

  const fetchEmployers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/employers');
      const data = await res.json();
      setEmployers(data);
    } catch (e) {
      setEmployers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!companyName.trim()) {
      setError('Company name is required');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/employers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName }),
      });
      if (!res.ok) throw new Error('Submission failed');
      await fetchEmployers();
      onClose();
      setCompanyName('');
      toast({
        title: 'Employer submitted.',
        status: 'success',
        duration: 2500,
        isClosable: true,
      });
    } catch (e) {
      setError('Submission failed.');
    }
    setSubmitting(false);
  };

  const handleVerifyClick = (employerId: number) => {
    setSelectedEmployerId(employerId);
    openVerifyModal();
  };

  const handleVerifySubmit = async ({ verify, reviewer }: { verify: boolean; reviewer: string }) => {
    if (selectedEmployerId == null) return;
    try {
      const res = await fetch(`/api/employers/${selectedEmployerId}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verify, reviewer }),
      });
      if (!res.ok) throw new Error('Verification failed');
      await fetchEmployers();
      toast({
        title: verify ? 'Employer approved' : 'Employer rejected',
        status: verify ? 'success' : 'warning',
        duration: 2500,
        isClosable: true,
      });
      closeVerifyModal();
    } catch (e) {
      toast({
        title: 'Verification failed',
        status: 'error',
        duration: 2500,
        isClosable: true,
      });
    }
  };

  return (
    <Layout>
      <Heading size="lg" mb={6}>Employers</Heading>
      <Box mb={4}>
        <Button colorScheme="blue" onClick={onOpen}>
          New Submission
        </Button>
      </Box>
      <Box bg="white" borderRadius="md" boxShadow="sm" p={4}>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Company Name</Th>
              <Th>Status</Th>
              <Th>Submitted</Th>
              <Th>Verified</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <Tr>
                <Td colSpan={5}>
                  <Skeleton height="20px" />
                </Td>
              </Tr>
            ) : employers.length === 0 ? (
              <Tr>
                <Td colSpan={5} textAlign="center">No employers found.</Td>
              </Tr>
            ) : (
              employers.map((employer) => (
                <Tr key={employer.id}>
                  <Td>{employer.companyName}</Td>
                  <Td>{employer.verificationStatus}</Td>
                  <Td>{employer.submittedAt ? new Date(employer.submittedAt).toLocaleString() : ''}</Td>
                  <Td>{employer.verifiedAt ? new Date(employer.verifiedAt).toLocaleString() : '-'}</Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="green"
                      variant="outline"
                      onClick={() => handleVerifyClick(employer.id)}
                      isDisabled={employer.verificationStatus !== 'PENDING'}
                    >
                      Verify
                    </Button>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>
      {/* New Submission Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submit Employer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="employer-form" onSubmit={handleSubmit}>
              <FormControl isInvalid={!!error} isRequired>
                <FormLabel>Company Name</FormLabel>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter company name"
                />
                {error && <FormErrorMessage>{error}</FormErrorMessage>}
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              type="submit"
              form="employer-form"
              isLoading={submitting}
            >
              Submit
            </Button>
            <Button onClick={onClose} variant="ghost">Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Verify Modal */}
      <VerifyModal
        isOpen={isVerifyOpen}
        onClose={closeVerifyModal}
        onSubmit={handleVerifySubmit}
      />
    </Layout>
  );
};

export default EmployersPage;