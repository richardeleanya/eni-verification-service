import React from 'react';
import { VStack, Box, Badge, Text } from '@chakra-ui/react';

type TimelineEvent = {
  date: string;
  label: string;
};

type TimelineProps = {
  events: TimelineEvent[];
};

const Timeline: React.FC<TimelineProps> = ({ events }) => (
  <VStack align="stretch" spacing={4} bg="white" p={4} borderRadius="md" boxShadow="sm">
    {events.map((e, idx) => (
      <Box key={idx} display="flex" alignItems="center">
        <Badge colorScheme="blue" mr={3} minW="76px" textAlign="center">
          {e.date}
        </Badge>
        <Text>{e.label}</Text>
      </Box>
    ))}
  </VStack>
);

export default Timeline;