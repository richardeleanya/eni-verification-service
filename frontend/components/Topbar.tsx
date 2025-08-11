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
  Badge,
} from '@chakra-ui/react';
import { SearchIcon, BellIcon, ChevronDownIcon } from '@chakra-ui/icons';

const Topbar: React.FC = () => (
  <Box
    as="header"
    w="full"
    bg="white"
    boxShadow="sm"
    px={6}
    py={3}
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
      <Flex align="center" gap={4}>
        <Box position="relative">
          <IconButton
            aria-label="Notifications"
            icon={<BellIcon />}
            variant="ghost"
            fontSize="xl"
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
          <MenuButton as={Flex} align="center" gap={2} cursor="pointer">
            <Avatar size="sm" name="Jane Smith" />
            <Text fontWeight="medium" fontSize="md" color="gray.700">
              Jane Smith
            </Text>
            <ChevronDownIcon />
          </MenuButton>
          <MenuList>
            <MenuItem>My Profile</MenuItem>
            <MenuItem>Security Settings</MenuItem>
            <MenuItem color="red.500">Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  </Box>
);

export default Topbar;