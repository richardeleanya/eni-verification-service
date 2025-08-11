import type { Meta, StoryObj } from '@storybook/react';
import ApplicationDetailPanel from './ApplicationDetailPanel';

const meta: Meta<typeof ApplicationDetailPanel> = {
  component: ApplicationDetailPanel,
  title: 'Home Office/ApplicationDetailPanel',
};

export default meta;

type Story = StoryObj<typeof ApplicationDetailPanel>;

export const Default: Story = { render: () => <ApplicationDetailPanel /> };