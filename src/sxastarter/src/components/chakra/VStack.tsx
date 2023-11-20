import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { VStack, Container } from '@chakra-ui/react';

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: ComponentProps): JSX.Element => {
  const containerStyles = props.params && props.params.Styles ? props.params.Styles : '';
  const styles = `${props.params.GridParameters} ${containerStyles}`.trimEnd();
  const phKey = `vstack-${props.params.DynamicPlaceholderId}`;
  //let backgroundStyle: {[key: string]: string} = {}

  return (
    <VStack
      className={`component container ${styles}`}
      w="100%"
      width="full"
      //style={backgroundStyle}
    >
      <Container maxW="container.xl" w="100%" width="full">
        <Placeholder name={phKey} rendering={props.rendering} />
      </Container>
    </VStack>
  );
};
