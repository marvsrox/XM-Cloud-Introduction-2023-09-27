/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button, Link, Text, VStack } from '@chakra-ui/react';

import { Category } from 'ordercloud-javascript-sdk';
import { FunctionComponent } from 'react';
import NextLink from 'next/link';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: FunctionComponent<CategoryCardProps> = ({ category }) => {
  return (
    <VStack h="full" justifyContent="space-between" p={2}>
      <NextLink href={`product-lists?categoryid=${category.ID}`} passHref>
        <Link color="gray.800">
          <Button mt="10px" variant={'primaryButton'}>
            <Text>{category.Name}</Text>
          </Button>
        </Link>
      </NextLink>
    </VStack>
  );
};

export default CategoryCard;
