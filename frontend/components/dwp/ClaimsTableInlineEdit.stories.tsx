import type { Meta, StoryObj } from '@storybook/react';
import ClaimsTable from './ClaimsTable';
import * as React from 'react';

const meta: Meta<typeof ClaimsTable> = {
  component: ClaimsTable,
  title: 'DWP/ClaimsTable/InlineEdit',
};

export default meta;

type Story = StoryObj<typeof ClaimsTable>;

export const InlineEdit: Story = {
  render: () => {
    // Mock fetch for Storybook
    // @ts-ignore
    global.fetch = jest.fn().mockImplementation((url, options) => {
      if (options && options.method === 'PATCH') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
      }
      return Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: 1,
              applicationId: 'APP-3001',
              status: 'Active',
              date: '2025-04-30T09:00:00Z',
            },
            {
              id: 2,
              applicationId: 'APP-3002',
              status: 'Closed',
              date: '2025-04-20T10:00:00Z',
            },
          ]),
      });
    });

    return <ClaimsTable />;
  },
};