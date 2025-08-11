import type { Meta, StoryObj } from '@storybook/react';
import BenefitSearchInput from './BenefitSearchInput';

const meta: Meta<typeof BenefitSearchInput> = {
  component: BenefitSearchInput,
  title: 'DWP/BenefitSearchInput',
};

export default meta;

type Story = StoryObj<typeof BenefitSearchInput>;

export const Default: Story = { render: () => <BenefitSearchInput /> };