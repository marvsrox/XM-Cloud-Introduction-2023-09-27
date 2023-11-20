/* eslint-disable @typescript-eslint/no-unused-vars */

import { HStack, Link, Text, VStack } from '@chakra-ui/react';

import NextLink from 'next/link';
import React from 'react';

export default function UserTabs() {
  return (
    <VStack
      border="1px"
      borderColor="gray.300"
      bgColor="gray.100"
      p="4"
      alignItems="flex-start"
      mr="10"
      minW="225px"
      borderRadius="3xl"
    >
      <NextLink href="/my-profile" passHref>
        <Link color="gray.800">
          <HStack>
            <Text>My Profile</Text>
          </HStack>
        </Link>
      </NextLink>
      <NextLink href="/my-profile/my-orders" passHref>
        <Link color="gray.800">
          <HStack>
            <Text>My Orders</Text>
          </HStack>
        </Link>
      </NextLink>
      <NextLink href="/my-profile/my-quotes" passHref>
        <Link color="gray.800">
          <HStack>
            <Text>My Quotes</Text>
          </HStack>
        </Link>
      </NextLink>
      <NextLink href="/my-profile/my-favorites" passHref>
        <Link color="gray.800">
          <HStack>
            <Text>My Favorites</Text>
          </HStack>
        </Link>
      </NextLink>
      <NextLink href="/my-profile/my-addresses" passHref>
        <Link color="gray.800">
          <HStack>
            <Text>My Addresses</Text>
          </HStack>
        </Link>
      </NextLink>
      <NextLink href="/my-profile/my-subscriptions" passHref>
        <Link color="gray.800">
          <HStack>
            <Text>My Subscriptions</Text>
          </HStack>
        </Link>
      </NextLink>
      <NextLink href="/my-profile/my-credit-cards" passHref>
        <Link color="gray.800">
          <HStack>
            <Text>My Credit Cards</Text>
          </HStack>
        </Link>
      </NextLink>
      <NextLink href="/my-profile/my-spending-accounts" passHref>
        <Link color="gray.800">
          <HStack>
            <Text>My Spending Accounts</Text>
          </HStack>
        </Link>
      </NextLink>
    </VStack>
  );
}
