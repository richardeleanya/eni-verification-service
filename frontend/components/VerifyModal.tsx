import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  Stack,
  FormErrorMessage,
} from '@chakra-ui/react';

type VerifyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (action: { verify: boolean; reviewer: string }) => Promise<void>;
  defaultVerify?: boolean;
};

const VerifyModal: React.FC<VerifyModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultVerify = true,
}) => {
  const [verify, setVerify] = useState(defaultVerify ? 'approve' : 'reject');
  const [reviewer, setReviewer] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await onSubmit({
        verify: verify === 'approve',
        reviewer,
      });
      onClose();
      setReviewer('');
      setVerify('approve');
    } catch (e) {
      setError('Failed to verify employer');
    }
    setSubmitting(false);
  };

  const handleClose = () => {
    setReviewer('');
    setVerify('approve');
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Verify Employer</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <RadioGroup
              value={verify}
              onChange={setVerify}
              name="verify-action"
              mb={4}
            >
              <Stack direction="row" spacing={6}>
                <Radio value="approve" colorScheme="green">
                  Approve
                </Radio>
                <Radio value="reject" colorScheme="red">
                  Reject
                </Radio>
              </Stack>
            </RadioGroup>
            <FormControl>
              <FormLabel>Reviewer (optional)</FormLabel>
              <Input
                value={reviewer}
                onChange={(e) => setReviewer(e.target.value)}
                placeholder="Enter your name or ID"
              />
            </FormControl>
            {error && (
              <FormErrorMessage mt={2}>{error}</FormErrorMessage>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={verify === 'approve' ? 'green' : 'red'}
              mr={3}
              type="submit"
              isLoading={submitting}
            >
              {verify === 'approve' ? 'Approve' : 'Reject'}
            </Button>
            <Button onClick={handleClose} variant="ghost">
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default VerifyModal;