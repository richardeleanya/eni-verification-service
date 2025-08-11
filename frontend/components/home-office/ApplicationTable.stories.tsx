import type { Meta, StoryObj } from '@storybook/react';
import ApplicationTable from './ApplicationTable';

const meta: Meta<typeof ApplicationTable> = {
  component: ApplicationTable,
  title: 'Home Office/ApplicationTable',
};

export default meta;

type Story = StoryObj<typeof ApplicationTable>;

export const Default: Story = { render: () => <ApplicationTable /> };