import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(username, password);
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      router.push('/');
    } catch (err) {
      toast({
        title: 'Login failed',
        description: 'Invalid username or password',
        status: 'error',
        duration: 2500,
        isClosable: true,
      });
    }
    setSubmitting(false);
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box bg="white" boxShadow="lg" p={8} borderRadius="md" minW="350px">
        <Heading size="lg" mb={6} textAlign="center">
          ENI Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4} isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </FormControl>
          <FormControl mb={6} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            w="full"
            isLoading={submitting}
          >
            Login
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default LoginPage;