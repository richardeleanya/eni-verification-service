import type { Meta, StoryObj } from '@storybook/react';
import FieldCheckInput from './FieldCheckInput';

const meta: Meta<typeof FieldCheckInput> = {
  component: FieldCheckInput,
  title: 'Police/FieldCheckInput',
};

export default meta;

type Story = StoryObj<typeof FieldCheckInput>;

export const Default: Story = { render: () => <FieldCheckInput /> };