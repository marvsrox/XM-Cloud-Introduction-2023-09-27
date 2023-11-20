import React from 'react';
import { Category } from 'ordercloud-javascript-sdk';
import { FunctionComponent } from 'react';
import useOcCategoryList from '../../../hooks/useOcCategoryList';

import { VStack } from '@chakra-ui/react';
//import FEAASCategoryCard from "../cards/CategoryCard_feaas"
import CategoryNavigationCard from '../cards/CategoryNavigationCard';
import { OcCategoryListOptions } from 'src/redux/ocCategoryList';

export interface CategoryListProps {
  options?: OcCategoryListOptions;
  renderItem?: (category: Category) => JSX.Element;
}

const CategoryNavigationList: FunctionComponent<CategoryListProps> = ({ options, renderItem }) => {
  const category = useOcCategoryList(options);

  return (
    <VStack as="section" w="full" width="100%" maxWidth="200px" alignItems="flex-start">
      {category &&
        category.map((p) => (
          <section key={p.ID}>
            {/* {renderItem ? renderItem(p) :  <FEAASCategoryCard initialData={p} />} */}
            {renderItem ? renderItem(p) : <CategoryNavigationCard category={p} />}
          </section>
        ))}
    </VStack>
  );
};

export default CategoryNavigationList;
