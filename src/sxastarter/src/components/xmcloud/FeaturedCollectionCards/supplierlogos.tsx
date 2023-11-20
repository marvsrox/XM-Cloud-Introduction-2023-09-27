/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, useStyleConfig } from '@chakra-ui/react';

import React from 'react';

function SupplierLogos(props: { [x: string]: any; variant: any; children: any }) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig('Card', { variant });

  //console.log(props)

  return (
    <Box
      bg="white"
      borderRadius="xl"
      __css={styles}
      {...rest}
      pt="2"
      pb="2"
      mb="6"
      shadow="xl"
      w="100%"
      width="full"
      position="relative"
      _hover={{
        textDecoration: 'none',
        borderRadius: '10px',
      }}
    >
      {/* <div>{props.Title}</div> */}
      DEFAULT
    </Box>
  );
}

export default SupplierLogos;
