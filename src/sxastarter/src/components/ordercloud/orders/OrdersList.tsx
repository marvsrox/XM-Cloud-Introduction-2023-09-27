import { Box, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import { Me, Order } from 'ordercloud-javascript-sdk';
import { useEffect, useState } from 'react';

import OrderCard from '../cards/OrderCard';

export default function OrdersList() {
  useEffect(() => {
    const initialize = async () => {
      // orders stuff
      const ordersList = await Me.ListOrders({ sortBy: ['DateCreated'] });
      setOrders(ordersList.Items);
    };
    initialize();
  }, []);

  const [orders, setOrders] = useState([] as Order[]);

  return (
    <VStack w="100%" width="full" textAlign="left">
      <Grid
        as="section"
        templateColumns="repeat(4, 1fr)"
        templateRows="(4, 1fr)"
        gap={3}
        w="full"
        width="100%"
        mt="3"
      >
        {orders.length == 0 && (
          <Box display="inline-block" mt="5">
            <Text mt="3">No orders have been created.</Text>
          </Box>
        )}
        {orders.map((order) => (
          <GridItem colSpan={1} rowSpan={1} w="full" width="100%" key={order.ID}>
            <OrderCard order={order} />
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
}
