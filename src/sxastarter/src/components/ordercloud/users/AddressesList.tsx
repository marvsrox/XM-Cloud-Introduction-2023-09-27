/* eslint-disable @typescript-eslint/no-unused-vars */

import { Address, Me } from 'ordercloud-javascript-sdk';
import { Box, Button, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import AddressCard from '../cards/AddressCard';
import Card from 'components/card/Card';
import NextLink from 'next/link';

export default function AddressesList() {
  useEffect(() => {
    const initialize = async () => {
      // address stuff
      const addressList = await Me.ListAddresses({ sortBy: ['DateCreated'] });
      setAddresses(addressList.Items);
      // const address =
      //   addressList.Items.find((a) => a.ID === order.ShippingAddressID) ??
      //   addressList.Items[0]
      // setSelectedAddress(address)
    };
    initialize();
  }, []);

  const [addresses, setAddresses] = useState([] as Address[]);

  return (
    <VStack w="100%" width="full" textAlign="left">
      <Grid
        as="section"
        templateColumns="repeat(3, 1fr)"
        templateRows="(3, 1fr)"
        gap={3}
        w="full"
        width="100%"
        mt="3"
      >
        {addresses.length == 0 && (
          <Box display="inline-block" mt="5">
            <Text mt="3">No addresses are set up.</Text>
          </Box>
        )}
        {addresses.map((address) => (
          <GridItem colSpan={1} rowSpan={1} w="full" width="100%" key={address.ID}>
            <Card variant="">
              <AddressCard address={address} />
              <NextLink
                href={`my-profile/my-addresses/address-details?addressid=${address.ID}`}
                passHref
              >
                <Button variant="outline" size="sm" mt="3">
                  Edit
                </Button>
              </NextLink>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
}
