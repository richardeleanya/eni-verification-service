import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TwoFactorAuthPage from './2fa';
import { useAuth } from '../../context/AuthContext';
import * as tfaService from '../../services/tfaService';
import { ChakraProvider } from '@chakra-ui/react';

jest.mock('../../context/AuthContext');
jest.mock('../../services/tfaService');

const mockUseAuth = useAuth as jest.Mock;
const mockSetupTfa = tfaService.setupTfa as jest.Mock;
const mockEnableTfa = tfaService.enableTfa as jest.Mock;
const mockDisableTfa = tfaService.disableTfa as jest.Mock;

// Mock window.location.reload
Object.defineProperty(window, 'location', {
  configurable: true,
  value: { reload: jest.fn() },
});

describe('TwoFactorAuthPage', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      user: {
        username: 'testuser',
        roles: ['ROLE_USER'],
        tfaEnabled: false,
      },
      token: 'test-token',
    });
    mockSetupTfa.mockResolvedValue(new Blob(['qr-code-data']));
  });

  it('renders the 2FA setup page', async () => {
    render(<ChakraProvider><TwoFactorAuthPage /></ChakraProvider>);

    expect(screen.getByRole('heading', { name: /Two-Factor Authentication/i })).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: /QR Code/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter 2FA code')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enable 2FA/i })).toBeInTheDocument();
  });

  it('allows enabling 2FA', async () => {
    render(<ChakraProvider><TwoFactorAuthPage /></ChakraProvider>);

    const codeInput = screen.getByPlaceholderText('Enter 2FA code');
    fireEvent.change(codeInput, { target: { value: '123456' } });

    const enableButton = screen.getByRole('button', { name: /Enable 2FA/i });
    fireEvent.click(enableButton);

    await waitFor(() => {
      expect(mockEnableTfa).toHaveBeenCalledWith('123456');
    });
  });

  it('shows the disable button when 2FA is enabled', () => {
    mockUseAuth.mockReturnValue({
      user: {
        username: 'testuser',
        roles: ['ROLE_USER'],
        tfaEnabled: true,
      },
      token: 'test-token',
    });
    render(<ChakraProvider><TwoFactorAuthPage /></ChakraProvider>);
    expect(screen.getByRole('button', { name: /Disable 2FA/i })).toBeInTheDocument();
  });
});
