/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Input,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs';

import NextLink from 'next/link';
import { Me, MeUser, SpendingAccount } from 'ordercloud-javascript-sdk';
import { useEffect, useState } from 'react';
import { useOcSelector } from 'src/redux/ocStore';
import formatPoints from 'src/utils/formatPoints';

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState([] as MeUser);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalFavorites, setFavorites] = useState(0);
  const [totalCreditCards, setCreditCards] = useState(0);
  const [totalAddresses, setAddresses] = useState(0);
  const [spendingAccount, setSpendingAccount] = useState({} as SpendingAccount);
  const [totalAvailablePoints, setAvailablePoints] = useState(0);
  const { isAnonymous } = useOcSelector((s) => ({
    isAnonymous: s.ocAuth.isAnonymous,
  }));

  const publicUrl = getPublicUrl();

  async function initData() {
    const ordersList = await Me.ListOrders();
    const favoritesList = await Me.ListProductCollections();
    const creditcardList = await Me.ListCreditCards();
    const addressesList = await Me.ListAddresses();
    const account = await Me.ListSpendingAccounts();
    setSpendingAccount(account.Items[0]);
    setAvailablePoints(account.Items[0].Balance);
    console.log(totalAvailablePoints);
    console.log(account.Items[0].Balance);
    console.log(spendingAccount);
    const userdetails: MeUser = await Me.Get();
    setUserProfile(userdetails);
    setTotalOrders(ordersList.Meta.TotalCount);
    setFavorites(favoritesList.Meta.TotalCount);
    setCreditCards(creditcardList.Meta.TotalCount);
    setAddresses(addressesList.Meta.TotalCount);
  }

  useEffect(() => {
    const initialize = async () => {
      if (isAnonymous) return;
      // profile stuff
      initData();
    };
    initialize();
  }, []);

  return (
    <VStack w="100%" width="full" textAlign="left">
      <SimpleGrid columns={2} spacing={2} w="100%" width="full" textAlign="left" mb="10">
        <VStack>
          <HStack w="100%" width="full" textAlign="left">
            <Text>Total orders: </Text>
            <Text>
              <NextLink href="/my-profile/my-orders" passHref>
                <Link color="gray.800" textDecoration="underline">
                  {totalOrders}
                </Link>
              </NextLink>
            </Text>
          </HStack>
        </VStack>
        <VStack>
          <HStack w="100%" width="full" textAlign="left">
            <Text>Total favorites: </Text>
            <Text>
              <NextLink href="/my-profile/my-favorites" passHref>
                <Link color="gray.800" textDecoration="underline">
                  {totalFavorites}
                </Link>
              </NextLink>
            </Text>
          </HStack>
        </VStack>
        <VStack>
          <HStack w="100%" width="full" textAlign="left">
            <Text>Available credit cards: </Text>
            <Text>
              <NextLink href="/my-profile/my-credit-cards" passHref>
                <Link color="gray.800" textDecoration="underline">
                  {totalCreditCards}
                </Link>
              </NextLink>
            </Text>
          </HStack>
        </VStack>
        <VStack>
          <HStack w="100%" width="full" textAlign="left">
            <Text>Available addresses: </Text>
            <Text>
              <NextLink href="/my-profile/my-addresses" passHref>
                <Link color="gray.800" textDecoration="underline">
                  {totalAddresses}
                </Link>
              </NextLink>
            </Text>
          </HStack>
        </VStack>
        <VStack>
          <HStack w="100%" width="full" textAlign="left">
            <Text>Loyalty points: </Text>
            <Text>
              <NextLink href="/my-profile/my-spending-accounts" passHref>
                <Link color="gray.800" textDecoration="underline">
                  {formatPoints(totalAvailablePoints)}
                </Link>
              </NextLink>
            </Text>
          </HStack>
        </VStack>
      </SimpleGrid>

      <SimpleGrid columns={2} spacing={2} w="100%" width="full" textAlign="left" mb="10">
        <VStack w="100%" width="full" textAlign="left">
          <VStack w="100%" width="full" textAlign="left">
            <HStack w="100%" width="full" textAlign="left">
              <img src={`${publicUrl}/Swipe.svg`} alt="" />
              <Text>100 Meals per semester</Text>
            </HStack>
          </VStack>
          <VStack w="100%" width="full" textAlign="left">
            <HStack w="100%" width="full" textAlign="left">
              <img src={`${publicUrl}/Price.svg`} alt="" />
              <Text>$200.00 Dining Dollars</Text>
            </HStack>
          </VStack>
          <VStack w="100%" width="full" textAlign="left">
            <HStack w="100%" width="full" textAlign="left">
              <img src={`${publicUrl}/Calendar.svg`} alt="" />
              <Text>Per semester</Text>
            </HStack>
          </VStack>
          <VStack w="100%" width="full" textAlign="left">
            <HStack w="100%" width="full" textAlign="left">
              <img src={`${publicUrl}/Guest.svg`} alt="" />
              <Text>Guest Meals: 5</Text>
            </HStack>
          </VStack>
          <VStack w="100%" width="full" textAlign="left">
            <HStack w="100%" width="full" textAlign="left">
              <img src={`${publicUrl}/Swipe.svg`} alt="" />
              <Text>Cash Equivalency: 3/ Week</Text>
            </HStack>
          </VStack>
        </VStack>
        <HStack>
          <NextLink href="/top-off" passHref>
            <Link color="gray.800" textDecoration="underline">
              <Button variant="solid" bg="brand.500" color="white">
                Add More Funds
              </Button>
            </Link>
          </NextLink>
        </HStack>
      </SimpleGrid>

      <Box as="form" w="100%" width="full" textAlign="left">
        <VStack w="100%" width="full" textAlign="left">
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
                value={userProfile.FirstName}
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
                value={userProfile.LastName}
              />
            </VStack>
          </HStack>

          <VStack w="100%" width="full">
            <Text w="100%" width="full">
              User Name:{' '}
            </Text>
            <Input
              name="Username"
              isRequired
              w="100%"
              width="full"
              placeholder="user name"
              value={userProfile.Username}
            />
          </VStack>
          <VStack w="100%" width="full">
            <Text w="100%" width="full">
              Email:{' '}
            </Text>
            <Input
              name="Email"
              isRequired
              w="100%"
              width="full"
              placeholder="email address"
              value={userProfile.Email}
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
              value={userProfile.Phone}
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
}
