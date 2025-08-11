import type { Meta, StoryObj } from '@storybook/react';
import RecordTable from './RecordTable';

const meta: Meta<typeof RecordTable> = {
  component: RecordTable,
  title: 'LocalAuthorities/RecordTable',
};

export default meta;

type Story = StoryObj<typeof RecordTable>;

export const Default: Story = { render: () => <RecordTable /> };