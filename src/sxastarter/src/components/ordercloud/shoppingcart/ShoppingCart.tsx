/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, HStack, Heading, Icon, Link, Text, VStack } from '@chakra-ui/react';

import Cookies from 'universal-cookie';
import { HiChevronDoubleRight } from 'react-icons/hi';
import NextLink from 'next/link';
import OcCurrentOrderLineItemList from './OcCurrentOrderLineItemList';
import React from 'react';
import { deleteCurrentOrder } from '../../../redux/ocCurrentOrder';
import useOcCurrentOrder from '../../../hooks/useOcCurrentOrder';
import { useOcDispatch } from '../../../redux/ocStore';

export const Default = (): JSX.Element => {
  const dispatch = useOcDispatch();
  const { lineItems } = useOcCurrentOrder();

  const cookies = new Cookies();
  let currentCheckOutPath = '/check-out';
  if (cookies.get('currentcheckoutflow') !== null) {
    currentCheckOutPath = cookies.get('currentcheckoutflow');
  }

  return (
    <VStack as="section" w="100%" width="full" pt="40px" pb="40px" mt="30px">
      <Heading as="h1">Cart</Heading>

      {lineItems && lineItems.length ? (
        <VStack w="100%" width="full" justifyContent="flex-end" pos="relative">
          <HStack w="100%" width="full" justifyContent="space-between">
            <Button
              type="button"
              onClick={() => dispatch(deleteCurrentOrder())}
              border="1px"
              bgColor="white"
              borderColor="gray.500"
              color="gray.500"
              p="4"
              rounded="sm"
              fontSize="12"
              pos="absolute"
              right="0px"
              top="0px"
            >
              Clear Cart
            </Button>
          </HStack>

          <VStack
            w="100%"
            width="full"
            justifyContent="space-between"
            alignItems="flex-end"
            pt="10"
          >
            <OcCurrentOrderLineItemList emptyMessage="Your cart is empty" editable />
            <NextLink href={currentCheckOutPath} passHref>
              <Link
                width={64}
                bg="brand.500"
                color="white"
                textAlign="center"
                p={4}
                display="inline-block"
              >
                <HStack w="100%" width="full" justifyContent="center">
                  <Text>Proceed to checkout</Text>
                  <Icon as={HiChevronDoubleRight} />
                </HStack>
              </Link>
            </NextLink>
          </VStack>
        </VStack>
      ) : (
        <VStack>
          <Text>Your cart is empty</Text>
        </VStack>
      )}
    </VStack>
  );
};
