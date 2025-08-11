import React, { useState } from 'react';
import {
  Box,
  Flex,
  IconButton,
  VStack,
  Text,
  Collapse,
  useBreakpointValue,
  Heading,
  Divider,
} from '@chakra-ui/react';
import { HamburgerIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { MdHome, MdSearch, MdDashboard, MdAccountBalance, MdPeople, MdGavel, MdLocalHospital, MdBusiness, MdSchool, MdStore, MdAttachMoney, MdLock } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

// Menu icon mapping per group
const groupIcons: Record<string, React.ReactNode> = {
  'home-office': <MdHome />,
  police: <MdGavel />,
  hmrc: <MdAccountBalance />,
  dwp: <MdDashboard />,
  nhs: <MdLocalHospital />,
  'local-authorities': <MdPeople />,
  employers: <MdBusiness />,
  'financial-services': <MdAttachMoney />,
  'housing-rental': <MdLock />,
  education: <MdSchool />,
  retail: <MdStore />,
  insurance: <MdAccountBalance />,
};

const agencyGroups = [
  // Tier 1
  { title: 'Home Office', key: 'home-office', path: '/home-office', tier: 1 },
  { title: 'Police', key: 'police', path: '/police', tier: 1 },
  // Tier 2
  { title: 'HMRC', key: 'hmrc', path: '/hmrc', tier: 2 },
  { title: 'DWP', key: 'dwp', path: '/dwp', tier: 2 },
  { title: 'NHS', key: 'nhs', path: '/nhs', tier: 2 },
  // Tier 3
  { title: 'Local Authorities', key: 'local-authorities', path: '/local-authorities', tier: 3 },
  { title: 'Employers', key: 'employers', path: '/employers', tier: 3 },
  // Tier 4
  { title: 'Financial Services', key: 'financial-services', path: '/financial-services', tier: 4 },
  { title: 'Housing & Rental', key: 'housing-rental', path: '/housing-rental', tier: 4 },
  { title: 'Education Sector', key: 'education', path: '/education', tier: 4 },
  { title: 'Insurance Companies', key: 'insurance', path: '/insurance', tier: 4 },
  // Tier 5
  { title: 'Retail & E-Commerce', key: 'retail', path: '/retail', tier: 5 },
];

// Map roles to sidebar keys they can see
const roleToKeys: Record<string, string[]> = {
  ROLE_ADMIN: agencyGroups.map((g) => g.key),
  ROLE_EMPLOYER: ['employers'],
  ROLE_POLICE: ['police'],
  ROLE_HMRC: ['hmrc'],
  ROLE_DWP: ['dwp'],
  ROLE_NHS: ['nhs'],
  ROLE_LOCAL: ['local-authorities'],
  ROLE_FINANCE: ['financial-services'],
  ROLE_HOUSING: ['housing-rental'],
  ROLE_EDUCATION: ['education'],
  ROLE_RETAIL: ['retail'],
  ROLE_INSURANCE: ['insurance'],
};

const tierLabels: Record<number, string> = {
  1: 'Tier 1 — Critical',
  2: 'Tier 2 — High',
  3: 'Tier 3 — Org',
  4: 'Tier 4 — Financial',
  5: 'Tier 5 — Limited',
};

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const router = useRouter();
  const { user } = useAuth();

  let allowedKeys: string[] = [];
  if (user?.roles) {
    if (user.roles.includes('ROLE_ADMIN')) {
      allowedKeys = agencyGroups.map((g) => g.key);
    } else {
      user.roles.forEach((role) => {
        if (roleToKeys[role]) {
          allowedKeys.push(...roleToKeys[role]);
        }
      });
    }
    allowedKeys = Array.from(new Set(allowedKeys));
  }

  const visibleGroups = user
    ? agencyGroups.filter((group) => allowedKeys.includes(group.key))
    : [];

  // Group visibleGroups by tier
  const groupsByTier = visibleGroups.reduce<Record<number, typeof agencyGroups>>((acc, g) => {
    acc[g.tier] = acc[g.tier] || [];
    acc[g.tier].push(g);
    return acc;
  }, {});

  return (
    <Box
      as="nav"
      bg="brand.900"
      minW={collapsed ? '60px' : '240px'}
      maxW={collapsed ? '60px' : '240px'}
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
        <Text fontWeight="bold" fontSize="xl" letterSpacing="wide">
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
      <Divider borderColor="brand.800" mb={2} />
      <VStack align="stretch" spacing={0} mt={2} px={2}>
        {Object.entries(groupsByTier).map(([tier, groups]) => (
          <Box key={tier} mb={1}>
            <Heading size="xs" color="gray.200" pl={3} pt={2} pb={1} fontWeight="bold">
              {tierLabels[Number(tier)]}
            </Heading>
            {groups.map((group) => {
              const isActive = router.pathname.startsWith(group.path);
              return (
                <Collapse in={!collapsed} unmountOnExit key={group.key}>
                  <Link href={group.path} passHref legacyBehavior>
                    <Flex
                      align="center"
                      px={3}
                      py={2}
                      borderRadius="md"
                      as="a"
                      borderLeft={isActive ? '4px solid' : '4px solid transparent'}
                      borderColor={isActive ? 'white' : 'transparent'}
                      bg={isActive ? 'brand.800' : undefined}
                      color={isActive ? 'accent.green' : 'white'}
                      fontWeight={isActive ? 'bold' : 'medium'}
                      _hover={{
                        bg: 'brand.800',
                        color: 'accent.green',
                        textDecor: 'none',
                      }}
                      transition="all 0.13s"
                      mb={1}
                    >
                      <Box as="span" mr={2} fontSize="lg" display="inline-flex">
                        {groupIcons[group.key] || <MdDashboard />}
                      </Box>
                      {!collapsed && group.title}
                    </Flex>
                  </Link>
                </Collapse>
              );
            })}
            <Divider borderColor="brand.800" my={2} />
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;