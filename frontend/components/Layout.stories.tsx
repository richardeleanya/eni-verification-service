import type { Meta, StoryObj } from '@storybook/react';
import Layout from './Layout';
import { Box, Text } from '@chakra-ui/react';

const meta: Meta<typeof Layout> = {
  component: Layout,
  title: 'Components/Layout',
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  render: () => (
    <Layout>
      <Box>
        <Text>Sample page content inside Layout</Text>
      </Box>
    </Layout>
  ),
};