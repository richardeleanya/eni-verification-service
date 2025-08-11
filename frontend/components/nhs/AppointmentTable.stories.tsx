import type { Meta, StoryObj } from '@storybook/react';
import AppointmentTable from './AppointmentTable';

const meta: Meta<typeof AppointmentTable> = {
  component: AppointmentTable,
  title: 'NHS/AppointmentTable',
};

export default meta;

type Story = StoryObj<typeof AppointmentTable>;

export const Default: Story = { render: () => <AppointmentTable /> };