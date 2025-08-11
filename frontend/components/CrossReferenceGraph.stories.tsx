import type { Meta, StoryObj } from '@storybook/react';
import CrossReferenceGraph from './CrossReferenceGraph';

const meta: Meta<typeof CrossReferenceGraph> = {
  component: CrossReferenceGraph,
  title: 'Advanced/CrossReferenceGraph',
};

export default meta;

type Story = StoryObj<typeof CrossReferenceGraph>;

export const Default: Story = { render: () => <CrossReferenceGraph /> };