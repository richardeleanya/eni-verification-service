import type { Meta, StoryObj } from '@storybook/react';
import ClaimsTable from './ClaimsTable';

const meta: Meta<typeof ClaimsTable> = {
  component: ClaimsTable,
  title: 'DWP/ClaimsTable',
};

export default meta;

type Story = StoryObj<typeof ClaimsTable>;

export const Default: Story = { render: () => <ClaimsTable /> };