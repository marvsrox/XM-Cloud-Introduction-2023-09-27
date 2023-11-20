/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, Container, Flex, GridItem, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';

import React from 'react';

const BACKGROUND_REG_EXP = new RegExp(
  /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi
);

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: ComponentProps): JSX.Element => {
  //const { sitecoreContext } = useSitecoreContext();
  //const containerStyles = props.params && props.params.Styles ? props.params.Styles : '';
  // const styles = `${props.params.GridParameters} ${containerStyles}`.trimEnd();
  // const phKey = `hstack-${props.params.DynamicPlaceholderId}`;
  let backgroundImage = props.params.BackgroundImage as string;
  // let backgroundStyle: { [key: string]: string } = {};

  if (backgroundImage) {
    //const prefix = `${sitecoreContext.pageState !== 'normal' ? '/sitecore/shell' : ''}/-/media/`;
    backgroundImage = `${backgroundImage?.match(BACKGROUND_REG_EXP)?.pop()?.replace(/-/gi, '')}`;
    // backgroundStyle = {
    //   backgroundImage: `url('${prefix}${backgroundImage}')`,
    // };
  }

  return (
    <VStack as="footer" width="full" align="center">
      <HStack as="section" bg="brand.500" w="100%" p="2">
        <Container maxW="container.xl" color="white" fontWeight="normal">
          <HStack as="section" bg="brand.500" w="100%" p="2">
            <Placeholder name="footer-logo" rendering={props.rendering} />
          </HStack>

          <SimpleGrid
            columns={{ lg: 4, md: 3, base: 1 }}
            gap={8}
            mt={4}
            mb={4}
            alignItems="flex-start"
          >
            <GridItem key="1">
              <HStack h="full" justifyContent="space-between" p={1}>
                <Placeholder name="footer-about-us-navigation" rendering={props.rendering} />
              </HStack>
            </GridItem>
            <GridItem key="2">
              <HStack h="full" justifyContent="space-between" p={1}>
                <Placeholder name="footer-top-categories-navigation" rendering={props.rendering} />
              </HStack>
            </GridItem>
            <GridItem key="3">
              <HStack h="full" justifyContent="space-between" p={1}>
                <Placeholder name="footer-my-account-navigation" rendering={props.rendering} />
              </HStack>
            </GridItem>
            <GridItem key="4">
              <HStack h="full" justifyContent="space-between" p={1}>
                <Placeholder name="footer-policies-navigation" rendering={props.rendering} />
              </HStack>
            </GridItem>
          </SimpleGrid>

          <Flex width="full" align="center">
            <VStack as="section" bg="brand.500" w="100%" p="2">
              <Box>
                <Text>
                  <Placeholder name="footer-copyright" rendering={props.rendering} />
                </Text>
              </Box>
            </VStack>
          </Flex>
        </Container>
      </HStack>
    </VStack>
  );
};
