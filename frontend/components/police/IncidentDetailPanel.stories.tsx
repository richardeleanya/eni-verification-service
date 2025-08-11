import type { Meta, StoryObj } from '@storybook/react';
import IncidentDetailPanel from './IncidentDetailPanel';

const meta: Meta<typeof IncidentDetailPanel> = {
  component: IncidentDetailPanel,
  title: 'Police/IncidentDetailPanel',
};

export default meta;

type Story = StoryObj<typeof IncidentDetailPanel>;

export const Default: Story = {
  render: () => <IncidentDetailPanel incidentId={123} />,
};