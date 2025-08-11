import type { Meta, StoryObj } from '@storybook/react';
import TransactionTable from './TransactionTable';

const meta: Meta<typeof TransactionTable> = {
  component: TransactionTable,
  title: 'HMRC/TransactionTable',
};

export default meta;

type Story = StoryObj<typeof TransactionTable>;

export const Default: Story = { render: () => <TransactionTable /> };