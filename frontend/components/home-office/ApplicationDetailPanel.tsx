import React, { useEffect, useState } from 'react';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Spinner,
} from '@chakra-ui/react';

type ApplicationDetailPanelProps = {
  applicationId: number | null;
};

const ApplicationDetailPanel: React.FC<ApplicationDetailPanelProps> = ({ applicationId }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (applicationId == null) {
      setData(null);
      return;
    }
    setLoading(true);
    fetch(`/api/home-office/applications/${applicationId}`)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [applicationId]);

  return (
    <Box bg="white" borderRadius="md" boxShadow="sm" p={4} minH="250px">
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Verification</Tab>
          <Tab>History</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {!applicationId ? (
              <Text color="gray.400">Select an application to view details.</Text>
            ) : loading ? (
              <Spinner />
            ) : data ? (
              <Text color="gray.600">{data.details || 'No details available.'}</Text>
            ) : (
              <Text color="red.500">Failed to load details.</Text>
            )}
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
};

export default ApplicationDetailPanel;