import type { Meta, StoryObj } from '@storybook/react';
import RecordSearchInput from './RecordSearchInput';

const meta: Meta<typeof RecordSearchInput> = {
  component: RecordSearchInput,
  title: 'LocalAuthorities/RecordSearchInput',
};

export default meta;

type Story = StoryObj<typeof RecordSearchInput>;

export const Default: Story = { render: () => <RecordSearchInput /> };