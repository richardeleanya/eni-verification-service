import type { Meta, StoryObj } from '@storybook/react';
import IncidentTable from './IncidentTable';

const meta: Meta<typeof IncidentTable> = {
  component: IncidentTable,
  title: 'Police/IncidentTable',
};

export default meta;

type Story = StoryObj<typeof IncidentTable>;

export const Default: Story = { render: () => <IncidentTable /> };