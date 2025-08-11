import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuditTrail from './AuditTrail';

const page1 = {
  totalElements: 3,
  content: [
    { id: 1, action: 'A1', performedBy: 'user1', timestamp: '2025-01-01T00:00:00Z' },
    { id: 2, action: 'A2', performedBy: 'user2', timestamp: '2025-01-01T01:00:00Z' },
  ],
};
const page2 = {
  totalElements: 3,
  content: [
    { id: 3, action: 'A3', performedBy: 'user3', timestamp: '2025-01-01T02:00:00Z' },
  ],
};

beforeEach(() => {
  let callCount = 0;
  // @ts-ignore
  global.fetch = jest.fn().mockImplementation(() => {
    callCount++;
    if (callCount === 1) {
      return Promise.resolve({ json: () => Promise.resolve(page1) });
    }
    if (callCount === 2) {
      return Promise.resolve({ json: () => Promise.resolve(page2) });
    }
    return Promise.resolve({ json: () => Promise.resolve({ totalElements: 0, content: [] }) });
  });
});

afterEach(() => {
  // @ts-ignore
  global.fetch.mockRestore && global.fetch.mockRestore();
});

test('renders AuditTrail and loads more entries', async () => {
  render(<AuditTrail domain="test" entityId={1} pageSize={2} />);
  expect(await screen.findByText('A1')).toBeInTheDocument();
  expect(screen.getByText('A2')).toBeInTheDocument();
  // Only two entries should be in the document
  expect(screen.queryByText('A3')).not.toBeInTheDocument();
  // Load More button shows
  expect(screen.getByText(/Load More/)).toBeInTheDocument();

  // Click Load More
  fireEvent.click(screen.getByText(/Load More/));
  // Wait for third entry to appear
  await waitFor(() => {
    expect(screen.getByText('A3')).toBeInTheDocument();
  });
  // All three should now be in the document
  expect(screen.getByText('A1')).toBeInTheDocument();
  expect(screen.getByText('A2')).toBeInTheDocument();
  expect(screen.getByText('A3')).toBeInTheDocument();
});