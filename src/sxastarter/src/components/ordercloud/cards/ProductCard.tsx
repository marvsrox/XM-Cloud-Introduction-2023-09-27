import { Button, Heading, Link, VStack, Text, Image } from '@chakra-ui/react';

import { BuyerProduct } from 'ordercloud-javascript-sdk';
import Card from 'components/card/Card';
import FavoritesListButton from '../products/FavoritesButton';
import { FunctionComponent } from 'react';
import NextLink from 'next/link';
import React from 'react';

// import formatPrice from "../../../utils/formatPrice"

interface ProductCardProps {
  product: BuyerProduct;
}

const ProductCard: FunctionComponent<ProductCardProps> = ({ product }) => {
  return (
    <Card variant="">
      <FavoritesListButton></FavoritesListButton>
      <VStack h="full" justifyContent="space-between" p={2} alignSelf="stretch">
        <Image src={product.xp?.Images[0]?.ThumbnailUrl} aria-label={product.Name}></Image>
        <VStack flex="1" justifyContent="space-between" alignItems="flex-start" p={[4, 2, 20, 6]}>
          <VStack w="100%" width="full">
            <Heading as="h3" fontSize="lg">
              {product.Name}
            </Heading>
            <Text>{product.Description}</Text>
          </VStack>
          {/* <Text fontSize="small" color="brand.500">
          <b>{formatPrice(product.PriceSchedule.PriceBreaks[0].Price)}</b>{" "} 
          </Text>*/}
          <NextLink href={`product-details?productid=${product.ID}`} passHref>
            <Link color="gray.800">
              <Button mt="10px" variant={'primaryButton'}>
                View details
              </Button>
            </Link>
          </NextLink>
        </VStack>
      </VStack>
    </Card>
  );
};
export default ProductCard;
