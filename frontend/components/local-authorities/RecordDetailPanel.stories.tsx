import type { Meta, StoryObj } from '@storybook/react';
import RecordDetailPanel from './RecordDetailPanel';

const meta: Meta<typeof RecordDetailPanel> = {
  component: RecordDetailPanel,
  title: 'LocalAuthorities/RecordDetailPanel',
};

export default meta;

type Story = StoryObj<typeof RecordDetailPanel>;

export const Default: Story = {
  render: () => <RecordDetailPanel recordId={123} />,
};