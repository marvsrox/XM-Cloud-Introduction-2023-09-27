/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import { Me, Subscription } from 'ordercloud-javascript-sdk';
import { useEffect, useState } from 'react';
import { formatShortDate } from '../../../utils/formatDate';
import Card from 'components/card/Card';
import NextLink from 'next/link';

export default function SubscriptionsList() {
  const [subscriptions, setSubscriptions] = useState([] as Subscription[]);

  useEffect(() => {
    const initialize = async () => {
      // spending account stuff
      const subscriptionsList = await Me.ListSubscriptions({
        sortBy: ['ID'],
      });
      setSubscriptions(subscriptionsList.Items);
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
        {subscriptions.length == 0 && (
          <Box display="inline-block" mt="5">
            <Text>No subscriptions are set up.</Text>
          </Box>
        )}
        {subscriptions.map((subscription) => (
          <GridItem key={subscription.ID}>
            <Card variant="">
              <Box
                key={subscription.ID}
                //onClick={() => setSelectedSubscriptions(subscription)}
                padding={5}
                marginBottom={5}
                border="1px solid lightgray"
                _hover={{ bg: 'brand.100' }}
              >
                <VStack fontSize="12">
                  <Text fontSize="18">{subscription?.xp?.SubscriptionLevel}</Text>
                  <Text>Expires {formatShortDate(subscription.EndDate)}</Text>
                </VStack>
                <NextLink
                  href={`my-profile/my-subscriptions-details?subscriptionid=${subscription.ID}`}
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
