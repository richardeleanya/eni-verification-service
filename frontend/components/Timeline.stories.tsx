import type { Meta, StoryObj } from '@storybook/react';
import Timeline from './Timeline';

const meta: Meta<typeof Timeline> = {
  component: Timeline,
  title: 'Advanced/Timeline',
};

export default meta;

type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  render: () => (
    <Timeline
      events={[
        { date: '2025-05-01', label: 'Profile created' },
        { date: '2025-06-10', label: 'Visa application submitted' },
        { date: '2025-08-15', label: 'Right to Work verified' },
      ]}
    />
  ),
};