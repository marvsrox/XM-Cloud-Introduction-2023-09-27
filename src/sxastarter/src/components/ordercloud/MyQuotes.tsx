import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { VStack, HStack, Container, Heading } from '@chakra-ui/react';
import UserTabs from './users/UserTabs';
import QuotesList from './orders/QuotesList';

const BACKGROUND_REG_EXP = new RegExp(
  /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi
);

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: ComponentProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const containerStyles = props.params && props.params.Styles ? props.params.Styles : '';
  const styles = `${props.params.GridParameters} ${containerStyles}`.trimEnd();
  const phKey = `my-quotes-${props.params.DynamicPlaceholderId}`;
  let backgroundImage = props.params.BackgroundImage as string;
  let backgroundStyle: { [key: string]: string } = {};

  if (backgroundImage) {
    const prefix = `${sitecoreContext.pageState !== 'normal' ? '/sitecore/shell' : ''}/-/media/`;
    backgroundImage = `${backgroundImage?.match(BACKGROUND_REG_EXP)?.pop()?.replace(/-/gi, '')}`;
    backgroundStyle = {
      backgroundImage: `url('${prefix}${backgroundImage}')`,
    };
  }

  return (
    <VStack
      className={`component container ${styles}`}
      as="section"
      w="100%"
      width="full"
      pt="40px"
      pb="40px"
      mt="30px"
    >
      <HStack
        as="section"
        w="100%"
        width="full"
        className="component-content"
        style={backgroundStyle}
      >
        <Container maxW="container.xl" w="100%" width="full">
          <HStack alignItems="flex-start">
            <UserTabs></UserTabs>
            <VStack textAlign="left" w="100%" width="full">
              <Heading as="h1" w="100%" width="full">
                My Quotes
              </Heading>
              <QuotesList></QuotesList>
            </VStack>
          </HStack>
          <Placeholder name={phKey} rendering={props.rendering} />
        </Container>
      </HStack>
    </VStack>
  );
};
