/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Me, Order } from 'ordercloud-javascript-sdk';
import Card from 'components/card/Card';
import NextLink from 'next/link';
import OrderCard from '../cards/OrderCard';

export default function QuotesList() {
  useEffect(() => {
    const initialize = async () => {
      // quotes stuff
      const quotesList = await Me.ListOrders({ sortBy: ['DateCreated'] });
      setOrders(quotesList.Items);
    };
    initialize();
  }, []);

  const [orders, setOrders] = useState([] as Order[]);

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
        {orders.length == 0 && (
          <Box display="inline-block" mt="5">
            <Text mt="3">No quotes have been created.</Text>
          </Box>
        )}
        {orders.map((order) => (
          <GridItem colSpan={1} rowSpan={1} w="full" width="100%" key={order.ID}>
            <Card variant="">
              <OrderCard order={order} />
              <NextLink href={`my-profile/my-quotes/quote-details?quoteid=${order.ID}`} passHref>
                <Button variant="outline" size="sm" mt="3">
                  View quote
                </Button>
              </NextLink>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
}
