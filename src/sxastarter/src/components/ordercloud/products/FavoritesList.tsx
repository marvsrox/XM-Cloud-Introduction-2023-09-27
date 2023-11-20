/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import { Me, ProductCollection } from 'ordercloud-javascript-sdk';
import { useEffect, useState } from 'react';

import ProductCard from '../cards/ProductCard';
import { useOcSelector } from 'src/redux/ocStore';

export default function ProductCollectionsList() {
  const [productCollections, setProductCollection] = useState([] as ProductCollection[]);
  const { isAnonymous } = useOcSelector((s) => ({
    isAnonymous: s.ocAuth.isAnonymous,
  }));

  useEffect(() => {
    const initialize = async () => {
      if(isAnonymous) return;
      const productcollectionList = await Me.ListProductCollections({
        sortBy: ['Name'],
      });
      setProductCollection(productcollectionList.Items);
    };
    initialize();
  }, []);

  function renderItem(_p: ProductCollection<any>): import('react').ReactNode {
    throw new Error('Function not implemented.');
  }

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
        {productCollections.length == 0 && (
          <Box display="inline-block" mt="5">
            <Text>No products are saved to favorites.</Text>
          </Box>
        )}
        {productCollections &&
          productCollections.map((p) => (
            <GridItem key={p.ID} colSpan={1} rowSpan={1} w="full" width="100%" rounded="lg">
              <section key={p.ID}>
                {/* {renderItem ? renderItem(p) :  <FEAASProductCard initialData={p} />} */}
                {renderItem ? renderItem(p) : <ProductCard product={p} />}
              </section>
            </GridItem>
          ))}
      </Grid>
    </VStack>
  );
}
