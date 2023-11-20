/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Divider, HStack, Heading, VStack } from '@chakra-ui/react';
import { FunctionComponent, useMemo } from 'react';
import { useOcDispatch, useOcSelector } from '../../../redux/ocStore';

import { BuyerAddress } from 'ordercloud-javascript-sdk';
import { HiChevronDoubleRight } from 'react-icons/hi';
import OcAddressBook from './OcAddressBook';
import OcAddressForm from './OcAddressForm';
import { OcCheckoutStepProps } from './steppedcheckout';
import React from 'react';
import { saveShippingAddress } from '../../../redux/ocCurrentOrder';

const OcCheckoutShipping: FunctionComponent<OcCheckoutStepProps> = ({ onNext }) => {
  const dispatch = useOcDispatch();

  const { initialized, order, lineItems, user } = useOcSelector((s) => ({
    initialized: s.ocCurrentOrder.initialized,
    order: s.ocCurrentOrder.order,
    lineItems: s.ocCurrentOrder.lineItems,
    user: s.ocUser.user,
  }));

  const handleSetShippingAddress = (address: Partial<BuyerAddress>) => {
    console.log('address', address);
    dispatch(saveShippingAddress(address));
  };

  const currentShippingAddress = useMemo(() => {
    if (initialized && lineItems && lineItems.length) {
      return lineItems[0].ShippingAddress;
    }
    return {};
  }, [initialized, lineItems]);

  const showAddressBook = useMemo(() => {
    return user && user.AvailableRoles && user.AvailableRoles.includes('MeAddressAdmin');
  }, [user]);

  return initialized && order ? (
    <VStack w="100%" width="full">
      <Heading as="h2">Shipping Information</Heading>
      {showAddressBook ? (
        <OcAddressBook
          id="shipping"
          listOptions={{ pageSize: 100 }}
          selected={order.ShippingAddressID}
          onChange={handleSetShippingAddress}
        />
      ) : (
        <OcAddressForm
          id="shipping"
          address={currentShippingAddress}
          onSubmit={handleSetShippingAddress}
        />
      )}
      {/* <OcShipEstimates /> */}
      <Divider />
      <HStack w="100%" width="full" justifyContent="flex-end">
        <Button
          type="button"
          onClick={onNext}
          float="right"
          bgColor="brand.500"
          color="white"
          rightIcon={<HiChevronDoubleRight />}
        >
          Billing
        </Button>
      </HStack>
    </VStack>
  ) : null;
};

export default OcCheckoutShipping;
