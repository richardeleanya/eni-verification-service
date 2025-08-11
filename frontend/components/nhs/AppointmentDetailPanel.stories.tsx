import type { Meta, StoryObj } from '@storybook/react';
import AppointmentDetailPanel from './AppointmentDetailPanel';

const meta: Meta<typeof AppointmentDetailPanel> = {
  component: AppointmentDetailPanel,
  title: 'NHS/AppointmentDetailPanel',
};

export default meta;

type Story = StoryObj<typeof AppointmentDetailPanel>;

export const Default: Story = {
  render: () => <AppointmentDetailPanel appointmentId={123} />,
};