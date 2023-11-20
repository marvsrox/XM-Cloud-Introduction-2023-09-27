/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, Button, ButtonGroup, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { BuyerAddress, Me } from 'ordercloud-javascript-sdk';
import { FunctionComponent, useEffect, useState } from 'react';
import { useOcSelector } from 'src/redux/ocStore';

interface AddressDetailProps {
  addressId: string;
}
const AddressDetails: FunctionComponent<AddressDetailProps> = ({ addressId }) => {
  const [userAddress, setUserAddress] = useState([] as BuyerAddress);
  const { isAnonymous } = useOcSelector((s) => ({
    isAnonymous: s.ocAuth.isAnonymous,
  }));
  async function initData() {
    const getuseraddress: BuyerAddress = await Me.GetAddress(addressId);
    setUserAddress(getuseraddress);
  }

  useEffect(() => {
    const initialize = async () => {
      if (isAnonymous) return;
      // address stuff
      initData();
    };
    initialize();
  }, []);

  return (
    <VStack w="100%" width="full" textAlign="left">
      <Box as="form" w="100%" width="full" textAlign="left">
        <VStack w="100%" width="full" textAlign="left">
          <VStack w="100%" width="full">
            <Text w="100%" width="full">
              Company Name:{' '}
            </Text>
            <Input
              name="CompanyName"
              w="100%"
              width="full"
              placeholder="company name"
              value={userAddress.CompanyName}
            />
          </VStack>
          <HStack w="100%" width="full" textAlign="left">
            <VStack w="100%" width="full">
              <Text w="100%" width="full">
                First Name:{' '}
              </Text>
              <Input
                name="FirstName"
                isRequired
                w="100%"
                width="full"
                placeholder="first name"
                value={userAddress.FirstName}
              />
            </VStack>
            <VStack w="100%" width="full">
              <Text w="100%" width="full">
                Last Name:{' '}
              </Text>
              <Input
                name="LastName"
                isRequired
                w="100%"
                width="full"
                placeholder="last name"
                value={userAddress.LastName}
              />
            </VStack>
          </HStack>

          <VStack w="100%" width="full">
            <Text w="100%" width="full">
              Address:{' '}
            </Text>
            <Input
              name="Street1"
              isRequired
              w="100%"
              width="full"
              placeholder="Address"
              value={userAddress.Street1}
            />
          </VStack>
          <VStack w="100%" width="full">
            <Text w="100%" width="full">
              Address two:{' '}
            </Text>
            <Input
              name="Street2"
              isRequired
              w="100%"
              width="full"
              placeholder="address two"
              value={userAddress.Street2}
            />
          </VStack>
          <HStack w="100%" width="full" textAlign="left">
            <VStack w="100%" width="full">
              <Text w="100%" width="full">
                City:{' '}
              </Text>
              <Input
                name="City"
                isRequired
                w="100%"
                width="full"
                type="tel"
                placeholder="city"
                value={userAddress.City}
              />
            </VStack>
            <VStack w="100%" width="full">
              <Text w="100%" width="full">
                State:{' '}
              </Text>
              <Input
                name="State"
                isRequired
                w="100%"
                width="full"
                type="tel"
                placeholder="state"
                value={userAddress.State}
              />
            </VStack>
            <VStack w="100%" width="full">
              <Text w="100%" width="full">
                Postal Code:{' '}
              </Text>
              <Input
                name="Postal Code"
                isRequired
                w="100%"
                width="full"
                type="tel"
                placeholder="postal code"
                value={userAddress.Zip}
              />
            </VStack>
          </HStack>
          <VStack w="100%" width="full">
            <Text w="100%" width="full">
              Country:{' '}
            </Text>
            <Input
              name="Country"
              isRequired
              w="100%"
              width="full"
              type="tel"
              placeholder="country"
              value={userAddress.Country}
            />
          </VStack>
          <VStack w="100%" width="full">
            <Text w="100%" width="full">
              Phone:{' '}
            </Text>
            <Input
              name="Phone"
              isRequired
              w="100%"
              width="full"
              type="tel"
              placeholder="phone number"
              value={userAddress.Phone}
            />
          </VStack>
          <VStack>
            <Text></Text>
          </VStack>
        </VStack>
        <ButtonGroup mt="10">
          <Button variant="solid" bg="brand.500" color="white">
            Save
          </Button>
          <Button variant="outline">Cancel</Button>
        </ButtonGroup>
      </Box>
    </VStack>
  );
};

export default AddressDetails;
