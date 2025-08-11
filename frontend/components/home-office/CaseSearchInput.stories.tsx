import type { Meta, StoryObj } from '@storybook/react';
import CaseSearchInput from './CaseSearchInput';

const meta: Meta<typeof CaseSearchInput> = {
  component: CaseSearchInput,
  title: 'Home Office/CaseSearchInput',
};

export default meta;

type Story = StoryObj<typeof CaseSearchInput>;

export const Default: Story = { render: () => <CaseSearchInput /> };