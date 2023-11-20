/* eslint-disable @typescript-eslint/no-unused-vars */

import { BuyerProduct, Me } from 'ordercloud-javascript-sdk';
import {
  Field,
  ImageField,
  Link,
  LinkField,
  RichText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Box, GridItem, HStack, Heading, SimpleGrid, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { OcProductListOptions } from 'src/redux/ocProductList';
import ProductCard from './cards/ProductCard';

// import FEAASProductCard from "./cards/ProductCard_feaas"
const BACKGROUND_REG_EXP = new RegExp(
  /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi
);

interface Fields {
  Title: Field<string>;
  Subhead: Field<string>;
  Description: Field<string>;
  Image: ImageField;
  CallToAction: LinkField;
  Disclaimer: Field<string>;
  FeaturedType: Field<string>;
  FeatureSelector: Field<string>;
  ReturnedCount: Field<string>;
}

type FeaturedProductsProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FeaturedProductsDefaultComponent = (props: FeaturedProductsProps): JSX.Element => (
  <div className={`component featured-products ${props.params.styles}`}>
    <div className="component-content">
      {/* <span className="is-empty-hint">{props.fields.Title}</span> */}
    </div>
  </div>
);

export const Default = (props: FeaturedProductsProps): JSX.Element => {
  const options = {} as OcProductListOptions;

  const [products, setProducts] = useState([] as BuyerProduct[]);
  const [searchRecords, setSearchRecords] = useState(4);
  useEffect(() => {
    // Default Search on XP featured products
    // let searchType = 'search';
    // if (props.fields.FeaturedType.value != undefined) {
    //   searchType = String(props.fields.FeaturedType.value);
    //   //console.log("Search")
    // }
    let searchTerm = '';
    if (props.fields.FeatureSelector.value != undefined) {
      searchTerm = String(props.fields.FeatureSelector.value);
      //console.log("hit")
    }
    let searchPageSize = searchRecords;
    if (props.fields.ReturnedCount.value != undefined) {
      searchPageSize = Number(props.fields.ReturnedCount.value);
    }
    options.search = searchTerm;
    options.page = 1;
    options.pageSize = searchPageSize;
    options.searchOn = ['Name', 'Description'];
    options.sortBy = ['Name'];

    // Search by Search Facet

    // Search by xp Extended Property
    //console.log('Search Type: ' + props.fields.FeaturedType.value);
    //console.log('Search Size: ' + searchPageSize);
    //console.log('Search Term: ' + props.fields.FeatureSelector.value);

    setSearchRecords(Number(searchPageSize));

    const getProducts = async () => {
      const productsList = await Me.ListProducts(options);
      setProducts(productsList.Items);
    };
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { sitecoreContext } = useSitecoreContext();
  const containerStyles = props.params && props.params.Styles ? props.params.Styles : '';
  const styles = `${props.params.GridParameters} ${containerStyles}`.trimEnd();
  let backgroundImage = props.params.BackgroundImage as string;
  let backgroundStyle: { [key: string]: string } = {};
  if (backgroundImage) {
    const prefix = `${sitecoreContext.pageState !== 'normal' ? '/sitecore/shell' : ''}/-/media/`;
    backgroundImage = `${backgroundImage?.match(BACKGROUND_REG_EXP)?.pop()?.replace(/-/gi, '')}`;
    backgroundStyle = {
      backgroundImage: `url('${prefix}${backgroundImage}')`,
    };
  }

  if (props.fields) {
    return (
      <VStack
        className={`component featured-products container ${styles}`}
        as="section"
        w="100%"
        width="full"
        pt="40px"
        pb="40px"
        mt="30px"
        style={backgroundStyle}
        bg="gray.200"
      >
        {props.fields.Title.value && (
          <Box className="featured-product-title" width="full" w="100%" textAlign="left" pl="30px">
            <Heading as="h3" fontSize="xl">
              <RichText field={props.fields.Title} />
            </Heading>
          </Box>
        )}
        {props.fields.Subhead.value && (
          <Box
            className="featured-product-subhead"
            width="full"
            w="100%"
            fontSize="lg"
            textAlign="left"
            pl="30px"
          >
            <RichText field={props.fields.Subhead} />
          </Box>
        )}
        {props.fields.Description.value && (
          <Box
            className="featured-product-description"
            width="full"
            w="100%"
            fontSize="md"
            textAlign="left"
            pl="30px"
          >
            <RichText field={props.fields.Description} />
          </Box>
        )}
        <HStack as="section" w="100%" width="full">
          <SimpleGrid
            columns={Number(searchRecords)}
            spacing={5}
            pl="30"
            pr="30"
            pt="30"
            rounded="xl"
            alignSelf="stretch"
            justifyContent="stretch"
          >
            {products &&
              products.map((p) => (
                <GridItem
                  key={p.ID}
                  colSpan={1}
                  rowSpan={1}
                  w="full"
                  width="100%"
                  rounded="lg"
                  h="full"
                  alignSelf="flex-start"
                  justifyContent="flex-start"
                  verticalAlign="flex-start"
                  display="flex"
                >
                  {/* {<FEAASProductCard initialData={p} />} */}
                  {<ProductCard product={p} />}
                </GridItem>
              ))}
          </SimpleGrid>
        </HStack>
        {props.fields.CallToAction.value && (
          <Box
            className="featured-product-calltoaction"
            width="full"
            w="100%"
            textAlign="left"
            pl="30px"
          >
            <Link field={props.fields.CallToAction} />
          </Box>
        )}
        {props.fields.Disclaimer.value && (
          <Box
            className="featured-product-disclaimer"
            width="full"
            w="100%"
            fontSize="md"
            textAlign="left"
            pl="30px"
          >
            <RichText field={props.fields.Disclaimer} />
          </Box>
        )}
      </VStack>
    );
  }

  return <FeaturedProductsDefaultComponent {...props} />;
};
