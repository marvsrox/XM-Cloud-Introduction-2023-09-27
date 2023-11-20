/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Text, VStack } from '@chakra-ui/react';

import Card from 'components/card/Card';
import { FunctionComponent } from 'react';
import NextLink from 'next/link';
import { Order } from 'ordercloud-javascript-sdk';
import { formatShortDate } from 'src/utils/formatDate';
import formatPrice from 'src/utils/formatPrice';

interface OrderCardProps {
  order: Order;
}

const OrderCard: FunctionComponent<OrderCardProps> = ({ order }) => {
  const paidWithPoints = order.xp?.PaymentMethodType === 'Points';
  return (
    <Card variant="">
      <VStack w="full" width="100%" justifyContent="space-between" p={2}>
        <VStack
          h="100%"
          w="full"
          width="100%"
          justifyContent="space-between"
          alignItems="space-between"
          verticalAlign="bottom"
          p={0}
        >
          <Text>
            <b>Order Date : </b> {formatShortDate(order.DateCreated)}
          </Text>
          <Text>
            <b>Items Ordered : </b> {order.LineItemCount}
          </Text>
          {!paidWithPoints && (
            <Text>
              <b>Order Total : </b> {formatPrice(order.Total)}
            </Text>
          )}
          {paidWithPoints && (
            <Text>
              <b>Points Total : </b> {order.Total}
            </Text>
          )}
          <NextLink href={`my-profile/my-orders/order-details?orderid=${order.ID}`} passHref>
            <Button variant="outline" size="sm" mt="3" width="100%" w="full">
              View order
            </Button>
          </NextLink>
        </VStack>
      </VStack>
    </Card>
  );
};

export default OrderCard;
