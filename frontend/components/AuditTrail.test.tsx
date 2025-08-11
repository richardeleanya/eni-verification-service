import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuditTrail from './AuditTrail';

// Fake audit data for two pages
const page1 = {
  content: [
    { id: 1, action: 'CREATED', performedBy: 'officer', timestamp: '2024-01-01T12:00:00Z' },
    { id: 2, action: 'REVIEWED', performedBy: 'sergeant', timestamp: '2024-01-01T13:00:00Z' },
    { id: 3, action: 'REVIEWED', performedBy: 'chief', timestamp: '2024-01-01T14:00:00Z' },
    { id: 4, action: 'UPDATED', performedBy: 'admin', timestamp: '2024-01-01T15:00:00Z' },
    { id: 5, action: 'CREATED', performedBy: 'system', timestamp: '2024-01-01T16:00:00Z' },
  ],
  totalElements: 7,
};
const page2 = {
  content: [
    { id: 6, action: 'REVIEWED', performedBy: 'sergeant', timestamp: '2024-01-01T17:00:00Z' },
    { id: 7, action: 'UPDATED', performedBy: 'admin', timestamp: '2024-01-01T18:00:00Z' },
  ],
  totalElements: 7,
};

beforeEach(() => {
  let callCount = 0;
  // @ts-ignore
  global.fetch = jest.fn().mockImplementation((url) => {
    callCount++;
    // Simulate filter param not changing the result for simplicity
    if (callCount === 1) {
      return Promise.resolve({
        json: () => Promise.resolve(page1),
      });
    }
    if (callCount === 2) {
      return Promise.resolve({
        json: () => Promise.resolve(page2),
      });
    }
    // For filter, return only actions that match
    if (url.includes('action=REVIEWED')) {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            content: page1.content.filter((e) => e.action === 'REVIEWED'),
            totalElements: 3,
          }),
      });
    }
    return Promise.resolve({
      json: () => Promise.resolve({ content: [], totalElements: 0 }),
    });
  });
});

afterEach(() => {
  // @ts-ignore
  global.fetch.mockRestore && global.fetch.mockRestore();
});

test('renders AuditTrail and loads more entries', async () => {
  render(<AuditTrail domain="police" entityId={3} pageSize={5} />);
  // Wait for first page to be loaded
  expect(await screen.findByText(/CREATED/)).toBeInTheDocument();
  // Should render 5 entries
  expect(screen.getAllByText(/CREATED|REVIEWED|UPDATED/)).toHaveLength(5);
  // Load More button appears
  expect(screen.getByText(/Load More/)).toBeInTheDocument();

  // Click Load More
  fireEvent.click(screen.getByText(/Load More/));
  // Wait for more entries to appear
  await waitFor(() => {
    expect(screen.getAllByText(/CREATED|REVIEWED|UPDATED/)).toHaveLength(7);
  });
});

test('filters by action', async () => {
  render(<AuditTrail domain="police" entityId={3} pageSize={5} />);
  // Wait for first page
  expect(await screen.findByText(/CREATED/)).toBeInTheDocument();
  // Open filter dropdown
  const select = screen.getByRole('combobox');
  // Change to "REVIEWED"
  fireEvent.change(select, { target: { value: 'REVIEWED' } });
  // Wait for filtered results
  await waitFor(() => {
    const reviewedBadges = screen.getAllByText('REVIEWED');
    expect(reviewedBadges.length).toBeGreaterThan(0);
    // Should show only reviewed in the list
    expect(screen.queryByText('CREATED')).not.toBeInTheDocument();
    expect(screen.queryByText('UPDATED')).not.toBeInTheDocument();
  });
});