import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  List,
  ListItem,
  Text,
  Link as ChakraLink,
  Flex,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Layout from '../components/Layout';

type SearchResult = {
  type: string;
  id: number;
  title: string;
  snippet: string;
};

const getDetailLink = (result: SearchResult) => {
  switch (result.type) {
    case 'employer':
      return `/employers/${result.id}`;
    case 'user':
      return `/users/${result.id}`;
    // Add more cases as needed
    default:
      return '/';
  }
};

const SearchPage: React.FC = () => {
  const router = useRouter();
  const initialQ = typeof router.query.q === 'string' ? router.query.q : '';
  const [query, setQuery] = useState(initialQ);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof router.query.q === 'string' && router.query.q.length > 0) {
      setQuery(router.query.q);
      setLoading(true);
      fetch(`/api/search?q=${encodeURIComponent(router.query.q)}`)
        .then((res) => res.json())
        .then((data) => setResults(data))
        .finally(() => setLoading(false));
    } else {
      setResults([]);
    }
  }, [router.query.q]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length > 0) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <Layout>
      <Heading size="lg" mb={4}>Global Search</Heading>
      <Box as="form" onSubmit={handleSearch} mb={6}>
        <FormControl>
          <FormLabel htmlFor="q">Search query</FormLabel>
          <Flex gap={2}>
            <Input
              id="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter name, ID, or keyword"
              maxW="350px"
            />
            <Button colorScheme="blue" type="submit">
              Search
            </Button>
          </Flex>
        </FormControl>
      </Box>
      <Box>
        {loading ? (
          <Text>Searching...</Text>
        ) : (
          <List spacing={4}>
            {results.length === 0 ? (
              <Text>No results found.</Text>
            ) : (
              results.map((result) => (
                <ListItem key={`${result.type}-${result.id}`} borderBottom="1px" borderColor="gray.200" py={2}>
                  <NextLink href={getDetailLink(result)} passHref>
                    <ChakraLink fontWeight="bold" fontSize="md" color="blue.700">
                      {result.title}
                    </ChakraLink>
                  </NextLink>
                  <Text fontSize="sm" color="gray.600">
                    {result.snippet}
                  </Text>
                  <Text fontSize="xs" color="gray.400">
                    Type: {result.type}
                  </Text>
                </ListItem>
              ))
            )}
          </List>
        )}
      </Box>
    </Layout>
  );
};

export default SearchPage;