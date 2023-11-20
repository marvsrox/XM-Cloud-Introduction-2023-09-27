/* eslint-disable @typescript-eslint/no-unused-vars */

import { Grid, GridItem, HStack, Text } from '@chakra-ui/react';

import { FunctionComponent } from 'react';
import { LineItem } from 'ordercloud-javascript-sdk';
import OcLineItemCard from './OcLineItemCard';

interface OcLineItemListProps {
  emptyMessage?: string;
  editable?: boolean;
  lineItems: LineItem[];
}

const OcLineItemList: FunctionComponent<OcLineItemListProps> = ({
  emptyMessage,
  editable,
  lineItems,
}) => {
  return lineItems && lineItems.length ? (
    <Grid
      as="section"
      templateColumns="repeat(1, 1fr)"
      templateRows="(1, 1fr)"
      gap={3}
      w="full"
      width="100%"
    >
      <GridItem colSpan={1} rowSpan={1} bg="#fafafa" borderRadius="0px" w="full" width="100%" p="4">
        <HStack w="100%" width="full" justifyContent="space-between">
          <HStack justifyContent="flex-start" w="50%" textAlign="left" alignItems="flex-start">
            <Text>PRODUCTS</Text>
          </HStack>
          <HStack justifyContent="center" w="10%" textAlign="left" alignItems="flex-start">
            <Text>PRICE</Text>
          </HStack>
          <HStack justifyContent="center" w="10%" textAlign="left" alignItems="flex-start">
            <Text ml="10px">QTY</Text>
          </HStack>
          <HStack justifyContent="center" w="10%" textAlign="left" alignItems="flex-start">
            <Text ml="15px">TOTAL</Text>
          </HStack>
          <HStack justifyContent="center" w="10%" textAlign="left" alignItems="flex-start">
            <Text></Text>
          </HStack>
        </HStack>
      </GridItem>
      {lineItems.map((li) => (
        <GridItem
          key={li.ID}
          colSpan={1}
          rowSpan={1}
          bg="white"
          border="1px"
          borderColor="gray.300"
          borderRadius="0px"
          w="full"
          width="100%"
          p="3"
        >
          <section key={li.ID}>
            <OcLineItemCard lineItem={li} editable={editable} />
          </section>
        </GridItem>
      ))}
    </Grid>
  ) : (
    <h3>{emptyMessage}</h3>
  );
};

export default OcLineItemList;
