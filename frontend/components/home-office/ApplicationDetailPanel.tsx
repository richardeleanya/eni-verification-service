import React from 'react';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from '@chakra-ui/react';

const ApplicationDetailPanel: React.FC = () => (
  <Box bg="white" borderRadius="md" boxShadow="sm" p={4} minH="250px">
    <Tabs variant="enclosed">
      <TabList>
        <Tab>Overview</Tab>
        <Tab>Verification</Tab>
        <Tab>History</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Text color="gray.600">Application overview details go here.</Text>
        </TabPanel>
        <TabPanel>
          <Text color="gray.600">Verification workflow UI goes here.</Text>
        </TabPanel>
        <TabPanel>
          <Text color="gray.600">History (audit log, changes) shown here.</Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Box>
);

export default ApplicationDetailPanel;