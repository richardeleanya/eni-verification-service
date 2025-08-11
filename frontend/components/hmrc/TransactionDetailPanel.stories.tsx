import type { Meta, StoryObj } from '@storybook/react';
import TransactionDetailPanel from './TransactionDetailPanel';

const meta: Meta<typeof TransactionDetailPanel> = {
  component: TransactionDetailPanel,
  title: 'HMRC/TransactionDetailPanel',
};

export default meta;

type Story = StoryObj<typeof TransactionDetailPanel>;

export const Default: Story = {
  render: () => <TransactionDetailPanel transactionId={123} />,
};