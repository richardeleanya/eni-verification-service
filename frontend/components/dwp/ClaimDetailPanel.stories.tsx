import type { Meta, StoryObj } from '@storybook/react';
import ClaimDetailPanel from './ClaimDetailPanel';

const meta: Meta<typeof ClaimDetailPanel> = {
  component: ClaimDetailPanel,
  title: 'DWP/ClaimDetailPanel',
};

export default meta;

type Story = StoryObj<typeof ClaimDetailPanel>;

export const Default: Story = {
  render: () => <ClaimDetailPanel claimId={123} />,
};