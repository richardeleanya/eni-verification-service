import React from 'react';
import { Box } from '@chakra-ui/react';
import { ForceGraph2D } from 'react-force-graph';

const nodes = [
  { id: 'A', name: 'Person A' },
  { id: 'B', name: 'Person B' },
  { id: 'C', name: 'Address C' },
];
const links = [
  { source: 'A', target: 'B', label: 'family' },
  { source: 'A', target: 'C', label: 'resides' },
];

const CrossReferenceGraph: React.FC = () => (
  <Box w="100%" h="400px" bg="white" borderRadius="md" boxShadow="sm">
    <ForceGraph2D
      graphData={{ nodes, links }}
      nodeId="id"
      width={undefined}
      height={400}
      linkDirectionalParticles={2}
      nodeLabel="name"
      linkLabel="label"
      backgroundColor="#f9f9f9"
    />
  </Box>
);

export default CrossReferenceGraph;