import type { Meta, StoryObj } from '@storybook/react';
import TaxCaseSearchInput from './TaxCaseSearchInput';

const meta: Meta<typeof TaxCaseSearchInput> = {
  component: TaxCaseSearchInput,
  title: 'HMRC/TaxCaseSearchInput',
};

export default meta;

type Story = StoryObj<typeof TaxCaseSearchInput>;

export const Default: Story = { render: () => <TaxCaseSearchInput /> };