/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Heading, Link, Text, VStack } from '@chakra-ui/react';

import React from 'react';

function FeaturedBanners(props: {
  [x: string]: any;
  content?: any;
  variant?: any;
  children?: any;
}) {
  return (
    // <AspectRatio ratio={{md: 1, base: 16 / 9}}>
    <VStack
      h="full"
      justifyContent="space-between"
      p={4}
      pt="10%"
      pb="10%"
      rounded="xl"
      bgImage={props?.Image?.value?.src}
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <VStack
        flex="1"
        justifyContent="flex-end"
        alignItems="flex-start"
        w="100%"
        width="full"
        padding="30px"
      >
        {props?.Subhead && (
          <Text fontSize="xs" textTransform="uppercase">
            {props?.Subhead?.value}
          </Text>
        )}
        {props?.Subhead && (
          <Heading as="h3" fontSize="lg">
            {props?.Title?.value}
          </Heading>
        )}
        {props?.CallToAction?.value?.href && (
          <Link href={props?.CallToAction?.value?.href} title={props?.CallToAction?.value?.title}>
            <Button mt="10px" variant={props?.CallToAction?.value?.class || 'primaryButton'}>
              {props?.CallToAction?.value?.text}
            </Button>
          </Link>
        )}
      </VStack>
    </VStack>
    // </AspectRatio>
  );
}

export default FeaturedBanners;
