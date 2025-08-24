import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Button,
  Image,
  Input,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import withAuth from '../../hocs/withAuth';
import { setupTfa, enableTfa, disableTfa } from '../../services/tfaService';
import { useAuth } from '../../context/AuthContext';

const TwoFactorAuthPage = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const { user, fetchAuth } = useAuth();
  const toast = useToast();

  const isTfaEnabled = user?.tfaEnabled || false;

  const handleSetup = async () => {
    try {
      const response = await setupTfa();
      const qrCodeUrl = URL.createObjectURL(response);
      setQrCode(qrCodeUrl);
    } catch (error) {
      toast({
        title: 'Error setting up 2FA',
        description: 'Could not generate QR code.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEnable = async () => {
    try {
      await enableTfa(code);
      toast({
        title: '2FA enabled successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // Refresh user data
      // This is a placeholder, in a real app you might refetch the user
      window.location.reload();
    } catch (error) {
      toast({
        title: 'Error enabling 2FA',
        description: 'The code you entered is invalid.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDisable = async () => {
    try {
      await disableTfa();
      toast({
        title: '2FA disabled successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      window.location.reload();
    } catch (error) {
      toast({
        title: 'Error disabling 2FA',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (!isTfaEnabled) {
      handleSetup();
    }
  }, [isTfaEnabled]);

  return (
    <Box>
      <Heading mb={8}>Two-Factor Authentication</Heading>
      {isTfaEnabled ? (
        <VStack spacing={4}>
          <Text>2FA is currently enabled on your account.</Text>
          <Button colorScheme="red" onClick={handleDisable}>
            Disable 2FA
          </Button>
        </VStack>
      ) : (
        <VStack spacing={4}>
          <Text>Scan the QR code with your authenticator app and enter the code to enable 2FA.</Text>
          {qrCode && <Image src={qrCode} alt="QR Code" />}
          <Input
            placeholder="Enter 2FA code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
          />
          <Button colorScheme="green" onClick={handleEnable} isDisabled={!code}>
            Enable 2FA
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default withAuth(TwoFactorAuthPage);
