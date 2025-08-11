import type { Meta, StoryObj } from '@storybook/react';
import PatientSearchInput from './PatientSearchInput';

const meta: Meta<typeof PatientSearchInput> = {
  component: PatientSearchInput,
  title: 'NHS/PatientSearchInput',
};

export default meta;

type Story = StoryObj<typeof PatientSearchInput>;

export const Default: Story = { render: () => <PatientSearchInput /> };