/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Heading, Link, Text, VStack } from '@chakra-ui/react';

import React from 'react';

function TopCategories(props: { [x: string]: any; content?: any; variant?: any; children?: any }) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  var parse = require('html-react-parser');

  return (
    // <AspectRatio ratio={{md: 1, base: 16 / 9}}>
    <VStack
      h="full"
      justifyContent="space-between"
      rounded="xl"
      bgImage={props?.Image?.value?.src}
      bgPosition="right"
      bgRepeat="no-repeat"
      borderColor="gray.200"
      border="1px"
    >
      <VStack
        flex="1"
        justifyContent="flex-end"
        alignItems="flex-start"
        w="100%"
        width="full"
        padding="30px"
        pr="80px"
      >
        {props?.Subhead && (
          <Heading as="h3" fontSize="lg">
            {props?.Title?.value}
          </Heading>
        )}
        {props?.Subhead && <Text>{props?.Subhead?.value}</Text>}
        {props?.Description && <Text>{parse(props?.Description?.value)}</Text>}
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

export default TopCategories;
