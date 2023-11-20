import { Button, HStack, VStack } from '@chakra-ui/react';
import React from 'react';

export const Default = (): JSX.Element => {
  return (
    <VStack w="100%" width="full" textAlign="center" alignItems="center" p={4}>
      <HStack
        w="100%"
        width="full"
        maxW="900px"
        textAlign="center"
        alignItems="center"
        border="1px"
        borderColor="gray.200"
        bgColor="gray.200"
        p={4}
        borderRadius="xl"
        verticalAlign="center"
      >
        <VStack w="250px" textAlign="right">
          <Button maxW="200px" mt="0px" type="submit">
            Add Funds
          </Button>
        </VStack>
      </HStack>
    </VStack>
  );
};
