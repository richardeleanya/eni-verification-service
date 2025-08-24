import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ConsentPage from '../pages/consent';
import * as consentService from '../services/consentService';
import { Consent } from '../types';

jest.mock('../services/consentService');
const mockGetConsents = consentService.getConsents as jest.Mock;
const mockUpdateConsent = consentService.updateConsent as jest.Mock;

const mockConsents: Consent[] = [
  { id: 1, agencyFrom: 'HMRC', agencyTo: 'Police', granted: true },
  { id: 2, agencyFrom: 'DWP', agencyTo: 'NHS', granted: false },
];

describe('ConsentPage', () => {
  beforeEach(() => {
    mockGetConsents.mockResolvedValue(mockConsents);
    mockUpdateConsent.mockImplementation(consent => Promise.resolve(consent));
  });

  it('renders the consent management page with consents', async () => {
    render(<ConsentPage />);

    await waitFor(() => {
      expect(screen.getByText('Consent Management')).toBeInTheDocument();
      expect(screen.getByText('HMRC')).toBeInTheDocument();
      expect(screen.getByText('Police')).toBeInTheDocument();
      expect(screen.getByText('DWP')).toBeInTheDocument();
      expect(screen.getByText('NHS')).toBeInTheDocument();
    });
  });

  it('allows updating a consent', async () => {
    render(<ConsentPage />);

    await waitFor(() => {
        const checkbox = screen.getAllByRole('checkbox')[0];
        fireEvent.click(checkbox);
    });

    await waitFor(() => {
      expect(mockUpdateConsent).toHaveBeenCalledWith({ ...mockConsents[0], granted: false });
    });
  });
});
