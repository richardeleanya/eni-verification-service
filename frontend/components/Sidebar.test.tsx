import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';

// Mock useAuth
jest.mock('../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const agencyTitles = [
  'Home Office',
  'Police',
  'HMRC',
  'DWP',
  'NHS',
  'Local Authorities',
  'Employers',
  'Financial Services',
  'Housing & Rental',
  'Education Sector',
  'Retail & E-Commerce',
  'Insurance Companies',
];

describe('Sidebar role-based rendering', () => {
  const { useAuth } = require('../context/AuthContext');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows no agencies when no user is logged in', () => {
    useAuth.mockReturnValue({ user: null });
    render(<Sidebar />);
    agencyTitles.forEach((title) => {
      expect(screen.queryByText(title)).not.toBeInTheDocument();
    });
  });

  it('shows only HMRC when user has ROLE_HMRC', () => {
    useAuth.mockReturnValue({
      user: {
        id: 123,
        username: 'hmrcuser',
        roles: ['ROLE_HMRC'],
      },
    });
    render(<Sidebar />);
    expect(screen.getByText('HMRC')).toBeInTheDocument();
    agencyTitles
      .filter((t) => t !== 'HMRC')
      .forEach((title) => {
        expect(screen.queryByText(title)).not.toBeInTheDocument();
      });
  });

  it('shows all agencies when user has ROLE_ADMIN', () => {
    useAuth.mockReturnValue({
      user: {
        id: 1,
        username: 'admin',
        roles: ['ROLE_ADMIN'],
      },
    });
    render(<Sidebar />);
    agencyTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });
});