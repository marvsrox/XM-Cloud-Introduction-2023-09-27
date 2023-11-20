/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, Button, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import { Me, SpendingAccount } from 'ordercloud-javascript-sdk';
import { useEffect, useState } from 'react';

import Card from 'components/card/Card';
import NextLink from 'next/link';
import { formatShortDate } from '../../../utils/formatDate';
import formatPoints from 'src/utils/formatPoints';

export default function SpendingAccountsList() {
  const [spendingAccounts, setSpendingAccount] = useState([] as SpendingAccount[]);

  useEffect(() => {
    const initialize = async () => {
      // spending account stuff
      const spendingaccountList = await Me.ListSpendingAccounts({
        sortBy: ['Name'],
      });
      setSpendingAccount(spendingaccountList.Items);
    };
    initialize();
  }, []);

  return (
    <VStack w="100%" width="full" textAlign="left" mt="3">
      <Grid
        as="section"
        templateColumns="repeat(3, 1fr)"
        templateRows="(3, 1fr)"
        gap={3}
        w="full"
        width="100%"
        mt="3"
      >
        {spendingAccounts.length == 0 && (
          <Box display="inline-block" mt="5">
            <Text>No spending accounts are set up.</Text>
          </Box>
        )}
        {spendingAccounts.map((spendingAccount) => (
          <GridItem key={spendingAccount.ID}>
            <Card variant="">
              <Box key={spendingAccount.ID} padding={2} marginBottom={5}>
                <VStack fontSize="16" w="full" width="100%" alignItems="flex-start">
                  <Text fontSize="lg" fontWeight="bold">
                    {spendingAccount.Name}
                  </Text>
                  <Text>
                    <b>Current Balance</b> : {formatPoints(spendingAccount.Balance)}
                  </Text>
                  <Text>
                    <b>Expires : </b> {formatShortDate(spendingAccount.EndDate)}
                  </Text>
                </VStack>
                <NextLink
                  href={`my-profile/my-spending-account-details?spendingaccountid=${spendingAccount.ID}`}
                  passHref
                >
                  <Button variant="outline" size="sm" mt="3">
                    Edit
                  </Button>
                </NextLink>
              </Box>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
}
