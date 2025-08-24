import { useState, useEffect } from 'react';
import { Box, Checkbox, Table, Thead, Tbody, Tr, Th, Td, Button, Heading } from '@chakra-ui/react';
import Layout from '../components/Layout';
import withAuth from '../hocs/withAuth';
import { getConsents, updateConsent } from '../services/consentService';
import { Consent } from '../types';

const ConsentPage = () => {
  const [consents, setConsents] = useState<Consent[]>([]);

  useEffect(() => {
    const fetchConsents = async () => {
      try {
        const data = await getConsents();
        setConsents(data);
      } catch (error) {
        console.error('Failed to fetch consents', error);
      }
    };

    fetchConsents();
  }, []);

  const handleConsentChange = async (consent: Consent) => {
    try {
      const updatedConsent = await updateConsent({ ...consent, granted: !consent.granted });
      setConsents(consents.map(c => c.id === updatedConsent.id ? updatedConsent : c));
    } catch (error) {
      console.error('Failed to update consent', error);
    }
  };

  return (
    <Layout>
      <Box p={8}>
        <Heading as="h1" size="xl" mb={8}>Consent Management</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Data From</Th>
              <Th>Data To</Th>
              <Th>Granted</Th>
            </Tr>
          </Thead>
          <Tbody>
            {consents.map(consent => (
              <Tr key={consent.id}>
                <Td>{consent.agencyFrom}</Td>
                <Td>{consent.agencyTo}</Td>
                <Td>
                  <Checkbox
                    isChecked={consent.granted}
                    onChange={() => handleConsentChange(consent)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Layout>
  );
};

export default withAuth(ConsentPage);
