import React, { useState } from 'react';
import { Box, Flex, IconButton, VStack, Text, Collapse, useBreakpointValue } from '@chakra-ui/react';
import { HamburgerIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';

const agencyGroups = [
  { title: 'Home Office', key: 'home-office', path: '/home-office' },
  { title: 'Police', key: 'police', path: '/police' },
  { title: 'HMRC', key: 'hmrc', path: '/hmrc' },
  { title: 'DWP', key: 'dwp', path: '/dwp' },
  { title: 'NHS', key: 'nhs', path: '/nhs' },
  { title: 'Local Authorities', key: 'local-authorities', path: '/local-authorities' },
  { title: 'Employers', key: 'employers', path: '/employers' },
  { title: 'Financial Services', key: 'financial-services', path: '/financial-services' },
  { title: 'Housing & Rental', key: 'housing-rental', path: '/housing-rental' },
  { title: 'Education Sector', key: 'education', path: '/education' },
  { title: 'Retail & E-Commerce', key: 'retail', path: '/retail' },
  { title: 'Insurance Companies', key: 'insurance', path: '/insurance' },
];

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const router = useRouter();

  return (
    <Box
      as="nav"
      bg="brand.900"
      minW={collapsed ? '60px' : '220px'}
      maxW={collapsed ? '60px' : '220px'}
      color="white"
      h="100vh"
      position="sticky"
      left={0}
      top={0}
      zIndex={100}
      boxShadow="md"
      transition="all 0.2s"
    >
      <Flex align="center" px={4} py={4} justify="space-between">
        <Text fontWeight="bold" fontSize="lg" letterSpacing="wide">
          {!collapsed && 'ENI'}
        </Text>
        <IconButton
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          icon={collapsed ? <HamburgerIcon /> : <ChevronLeftIcon />}
          size="sm"
          variant="ghost"
          color="white"
          onClick={() => setCollapsed((c) => !c)}
        />
      </Flex>
      <VStack align="stretch" spacing={1} mt={2} px={2}>
        {agencyGroups.map((group) => (
          <Collapse in={!collapsed} unmountOnExit key={group.key}>
            <Link href={group.path} passHref legacyBehavior>
              <Flex
                align="center"
                px={3}
                py={2}
                borderRadius="md"
                as="a"
                bg={router.pathname.startsWith(group.path) ? 'brand.800' : undefined}
                _hover={{ bg: 'brand.800', cursor: 'pointer' }}
                fontSize="md"
                fontWeight="medium"
              >
                {group.title}
              </Flex>
            </Link>
          </Collapse>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;