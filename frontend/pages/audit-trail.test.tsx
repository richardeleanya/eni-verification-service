import React from 'react';
import { render, screen } from '@testing-library/react';
import AuditTrailPage from './audit-trail';
import { useAuth } from '../context/AuthContext';
import { ChakraProvider } from '@chakra-ui/react';

jest.mock('../context/AuthContext');
const mockUseAuth = useAuth as jest.Mock;

const mockAuditTrailData = {
  totalElements: 1,
  content: [
    { id: 1, action: 'LOGIN_SUCCESS', performedBy: 'testuser', timestamp: '2025-01-01T00:00:00Z' },
  ],
};

beforeEach(() => {
  mockUseAuth.mockReturnValue({
    token: 'test-token',
  });
  // @ts-ignore
  global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve(mockAuditTrailData),
  });
});

afterEach(() => {
  // @ts-ignore
  global.fetch.mockRestore && global.fetch.mockRestore();
});

test('renders the audit trail page', async () => {
  render(<ChakraProvider><AuditTrailPage /></ChakraProvider>);

  expect(screen.getByRole('heading', { name: /Audit Trail/i })).toBeInTheDocument();

  const listItem = await screen.findByRole('listitem');
  expect(listItem).toHaveTextContent('LOGIN_SUCCESS');
});
