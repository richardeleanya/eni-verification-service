import React from 'react';
import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Button,
  Badge,
  HStack,
  Spacer,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { MdNotifications } from 'react-icons/md';
import Link from 'next/link';

const Topbar: React.FC = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      as="header"
      w="full"
      bg="white"
      boxShadow="sm"
      px={6}
      py={4}
      position="sticky"
      top={0}
      zIndex={99}
    >
      <Flex align="center" justify="space-between">
        <InputGroup w="350px" maxW="60vw">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input placeholder="Global search (name, NI number...)" variant="filled" />
        </InputGroup>
        <Spacer />
        <HStack spacing={5}>
          <Tooltip label="Session expires in 14:58" hasArrow>
            <Badge
              variant="subtle"
              colorScheme="red"
              fontWeight="bold"
              px={3}
              py={1}
              fontSize="sm"
            >
              Session expires in 14:58
            </Badge>
          </Tooltip>
          <Box position="relative">
            <IconButton
              aria-label="Notifications"
              icon={<MdNotifications />}
              variant="ghost"
              fontSize="2xl"
              color="brand.900"
            />
            <Badge
              colorScheme="red"
              borderRadius="full"
              position="absolute"
              top="0"
              right="0"
              fontSize="0.7em"
              px={2}
            >
              4
            </Badge>
          </Box>
          <Menu>
            <MenuButton as={Button} variant="ghost" p={2}>
              <Flex align="center" gap={2}>
                <Avatar size="sm" name="Jane Smith" />
                {!isMobile && (
                  <Text fontWeight="medium" fontSize="md" color="brand.900">
                    Jane Smith
                  </Text>
                )}
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem>My Profile</MenuItem>
              <Link href="/settings/2fa" passHref>
                <MenuItem>2FA Settings</MenuItem>
              </Link>
              <MenuItem>Settings</MenuItem>
              <MenuItem color="red.500">Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Topbar;