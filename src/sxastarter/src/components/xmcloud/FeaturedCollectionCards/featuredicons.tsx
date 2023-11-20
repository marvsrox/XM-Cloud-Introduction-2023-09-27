/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Heading, Image, Link, Text, VStack } from '@chakra-ui/react';

import React from 'react';

function FeaturedIcons(props: { [x: string]: any; content?: any; variant?: any; children?: any }) {
  return (
    <VStack h="full" width="full" w="100%" justifyContent="center" alignItems="center" p={2}>
      {props?.fields?.Image && (
        <Image src={props?.fields?.Image?.value?.src} alt={props?.fields?.Image?.value?.Title} />
      )}
      {props?.fields?.Title?.value && (
        <Heading as="h3" fontWeight="semibold" fontSize="md">
          {props?.fields?.Title?.value}
        </Heading>
      )}
      {props?.fields?.Subhead?.value && <Text fontSize="sm">{props?.Subhead?.value}</Text>}
      {props?.fields?.CallToAction?.value?.href && (
        <Link
          href={props?.fields?.CallToAction?.value?.href}
          title={props?.fields?.CallToAction?.value?.title}
        >
          <Button mt="10px" variant={props?.fields?.CallToAction?.value?.class || 'primaryButton'}>
            {props?.fields?.CallToAction?.value?.text}
          </Button>
        </Link>
      )}
    </VStack>
  );
}

export default FeaturedIcons;
