/* eslint-disable @typescript-eslint/no-unused-vars */

import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { Container, HStack, Heading, VStack } from '@chakra-ui/react';

import OcProductDetail from './products/OcProductDetails';
import React from 'react';
import { useRouter } from 'next/router';

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (_props: ComponentProps): JSX.Element => {
  const { isReady, query, push } = useRouter();

  const handleLineItemUpdated = () => {
    push('/cart');
  };

  return (
    <VStack
      className={`component container`}
      as="section"
      w="100%"
      width="full"
      pt="40px"
      pb="40px"
      mt="30px"
    >
      <Heading as="h3">Have it all in</Heading>
      <HStack as="section" w="100%" width="full" className="component-content">
        <Container maxW="container.xl" w="100%" width="full">
          {isReady ? (
            <OcProductDetail
              onLineItemUpdated={handleLineItemUpdated}
              productId={query.productid as string}
              lineItemId={query.lineitem as string}
            />
          ) : (
            <h3>Loading</h3>
          )}
        </Container>
      </HStack>
    </VStack>
  );
};
