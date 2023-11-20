/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, Button, Grid, GridItem, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { BuyerCreditCard, Me } from 'ordercloud-javascript-sdk';
import Card from 'components/card/Card';
import NextLink from 'next/link';
import { formatCreditCardDate } from '../../../utils/formatDate';

export default function CreditCardsList() {
  const [creditCards, setCreditCards] = useState([] as BuyerCreditCard[]);
  useEffect(() => {
    const initialize = async () => {
      // credit card stuff
      const creditCardList = await Me.ListCreditCards({ sortBy: ['DateCreated'] });
      setCreditCards(creditCardList.Items);
    };
    initialize();
  }, []);

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
        {creditCards.length == 0 && (
          <Box display="inline-block" mt="5">
            <Text>No credit cards are set up.</Text>
          </Box>
        )}
        {creditCards.map((creditCard) => (
          <GridItem key={creditCard.ID}>
            <Card variant="">
              <Box key={creditCard.ID}>
                <VStack fontSize="12">
                  <Text fontSize="12">{creditCard.CardholderName}</Text>
                  <HStack>
                    <Box
                      border="1px"
                      borderColor="gray.400"
                      borderRadius="lg"
                      bgColor="gray.200"
                      p="2px"
                    >
                      {creditCard.CardType}
                    </Box>{' '}
                    <Text>ending in {creditCard.PartialAccountNumber}</Text>
                  </HStack>
                  <Text>Expires {formatCreditCardDate(creditCard.ExpirationDate)}</Text>
                </VStack>
                <NextLink
                  href={`my-profile/my-credit-cards-details?creditcardid=${creditCard.ID}`}
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
