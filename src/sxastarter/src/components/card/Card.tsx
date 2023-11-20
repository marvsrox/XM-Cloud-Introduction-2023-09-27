/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, useStyleConfig } from '@chakra-ui/react';

function Card(props: { [x: string]: any; variant: any; children: any }) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig('Card', { variant });

  return (
    <Box
      bg="white"
      border="1px"
      borderColor="gray.300"
      borderRadius="xl"
      alignSelf="stretch"
      justifyContent="stretch"
      __css={styles}
      {...rest}
      p="4"
      mb="6"
      shadow="xl"
      position="relative"
      _hover={{
        textDecoration: 'none',
        borderRadius: '10px',
        bgColor: '#f9f9f9',
      }}
    >
      {children}
    </Box>
  );
}

export default Card;
