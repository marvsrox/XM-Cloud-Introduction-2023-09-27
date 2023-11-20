/* eslint-disable no-lone-blocks */

import {
  Box,
  Button,
  GridItem,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  Field,
  ImageField,
  Link as JssLink,
  RichText as JssRichText,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';

// import FeaturedIconsVariant from "./FeaturedCollectionCards/featuredicons"
// import FeaturedBannersVariant from "./FeaturedCollectionCards/featuredbanners"
// import RecentBlogsVariant from "./FeaturedCollectionCards/recentblogs"
// import SupplierLogosVariant from "./FeaturedCollectionCards/supplierlogos"
// import TopCategoriesVariant from "./FeaturedCollectionCards/topcategories"

// Component: Featured Collection
// Version:   Name
// URL:       https://components.sitecorecloud.io/components/UFUFr-Hr2Z

interface Fields {
  Title: Field<string>;
  CallToAction: LinkField;
  CollectionItems: Array<FeaturedCollectionItems>;
  Disclaimer: Field<string>;
}

interface FeaturedCollectionItems {
  id: Field<string>;
  name: Field<string>;
  displayName: Field<string>;
  url: Field<string>;
  fields: FeaturedCollectionItem;
}

interface FeaturedCollectionItem {
  Title: Field<string>;
  Subhead: Field<string>;
  Description: Field<string>;
  Image: ImageField;
  CallToAction: LinkField;
  CssClass: Field<string>;
  Disclaimer: Field<string>;
}

type FeaturedCollectionProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FeaturedCollectionDefaultComponent = (props: FeaturedCollectionProps): JSX.Element => (
  <div className={`component featured-collection ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Featured Collection</span>
    </div>
  </div>
);

export const Default = (props: FeaturedCollectionProps): JSX.Element => {
  let columnDesktopCount = 3;
  const columnMediumCount = 2;
  const columnSmallCount = 1;

  //Dynamically set the column count for desktop, medium and small are fixed today but could be authorable in the future
  {
    props.fields.CollectionItems.length > 3
      ? (columnDesktopCount = 4)
      : (columnDesktopCount = props.fields.CollectionItems.length);
  }

  const list = Object.values(props.fields.CollectionItems)
    .filter((element) => element)
    .map((element: FeaturedCollectionItems, key: number) => (
      <GridItem key={key}>
        <Box w="full" width="100%">
          <GridItem key={key}>
            <Box w="full" width="100%">
              <VStack
                h="full"
                width="full"
                w="100%"
                justifyContent="center"
                alignItems="center"
                p="20px"
              >
                {element.fields.Image && <Image src={element?.fields?.Image?.value?.src} />}
                <VStack width="full" w="100%" p={4}>
                  {props?.fields?.Title?.value && (
                    <Heading as="h3" fontWeight="semibold" fontSize="md">
                      {element?.fields?.Title?.value}
                    </Heading>
                  )}
                  {element?.fields?.Subhead?.value && (
                    <Text fontSize="md">{element?.fields?.Subhead?.value}</Text>
                  )}
                  {element?.fields?.CallToAction?.value?.href && (
                    <Link
                      href={element?.fields?.CallToAction?.value?.href}
                      title={element?.fields?.CallToAction?.value?.title}
                    >
                      <Button
                        mt="10px"
                        variant={element?.fields?.CallToAction?.value?.class || 'primaryButton'}
                      >
                        {element?.fields?.CallToAction?.value?.text}
                      </Button>
                    </Link>
                  )}
                </VStack>
              </VStack>
            </Box>
          </GridItem>
        </Box>
      </GridItem>
    ));

  if (props.fields) {
    return (
      <Box
        maxW="container.xl"
        className={`component featured-collection ${props.params.styles}`}
        mb="40px"
        w="100%"
        width="full"
      >
        <Box className="component-content" w="100%" width="full">
          <div className="featured-collection-text">
            <div>
              {props.fields.Title && (
                <div className="featured-collection-title">
                  <JssRichText field={props.fields.Title} />
                </div>
              )}
            </div>
            <div className="featured-collection-items">
              <SimpleGrid
                columns={{
                  xl: columnDesktopCount,
                  lg: columnDesktopCount,
                  md: columnMediumCount,
                  sm: columnSmallCount,
                  base: columnSmallCount,
                }}
                gap={{ xl: 6, lg: 4, md: 2, sm: 0, base: 0 }}
                mt={{ xl: 4, lg: 4, md: 2, sm: 0, base: 0 }}
                mb={0}
                w="100%"
                width="full"
                alignSelf="stretch"
                justifyContent="stretch"
              >
                {list}
              </SimpleGrid>
            </div>
            {props.fields.CallToAction && (
              <div className="featured-collection-call-to-action">
                <JssLink field={props.fields.CallToAction} />
              </div>
            )}
            {props.fields.Disclaimer && (
              <div className="featured-collection-disclaimer">
                <JssRichText field={props.fields.Disclaimer} />
              </div>
            )}
          </div>
        </Box>
      </Box>
    );
  }

  return <FeaturedCollectionDefaultComponent {...props} />;
};
const FeaturedCollectionFeaturedIconsComponent = (props: FeaturedCollectionProps): JSX.Element => (
  <div className={`component featured-collection ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Featured Collection</span>
    </div>
  </div>
);
export const FeaturedIcons = (props: FeaturedCollectionProps): JSX.Element => {
  let columnDesktopCount = 3;
  const columnMediumCount = 2;
  const columnSmallCount = 1;

  //Dynamically set the column count for desktop, medium and small are fixed today but could be authorable in the future
  {
    props.fields.CollectionItems.length > 3
      ? (columnDesktopCount = 4)
      : (columnDesktopCount = props.fields.CollectionItems.length);
  }
  const list = Object.values(props.fields.CollectionItems)
    .filter((element) => element)
    .map((element: FeaturedCollectionItems, key: number) => (
      <GridItem key={key}>
        <Box w="full" width="100%">
          <VStack h="full" width="full" w="100%" justifyContent="center" alignItems="center" p={2}>
            {element.fields.Image && <Image src={element?.fields?.Image?.value?.src} />}
            <VStack width="full" w="100%" p={4}>
              {props?.fields?.Title?.value && (
                <Heading as="h3" fontWeight="semibold" fontSize="md">
                  {element?.fields?.Title?.value}
                </Heading>
              )}
              {element?.fields?.Subhead?.value && (
                <Text fontSize="md">{element?.fields?.Subhead?.value}</Text>
              )}

              {element?.fields?.CallToAction?.value?.href && (
                <Link
                  href={element?.fields?.CallToAction?.value?.href}
                  title={element?.fields?.CallToAction?.value?.title}
                >
                  <Button
                    mt="10px"
                    variant={element?.fields?.CallToAction?.value?.class || 'primaryButton'}
                  >
                    {element?.fields?.CallToAction?.value?.text}
                  </Button>
                </Link>
              )}
            </VStack>
          </VStack>
        </Box>
      </GridItem>
    ));

  if (props.fields) {
    return (
      <Box
        maxW="container.xl"
        className={`component featured-collection ${props.params.styles}`}
        mb="40px"
        w="100%"
        width="full"
      >
        <Box className="component-content" w="100%" width="full">
          <div className="featured-collection-text">
            <div>
              {props.fields.Title && (
                <div className="featured-collection-title">
                  <JssRichText field={props.fields.Title} />
                </div>
              )}
            </div>
            <div className="featured-collection-items">
              <SimpleGrid
                columns={{
                  xl: columnDesktopCount,
                  lg: columnDesktopCount,
                  md: columnMediumCount,
                  sm: columnSmallCount,
                  base: columnSmallCount,
                }}
                gap={{ xl: 6, lg: 4, md: 2, sm: 0, base: 0 }}
                mt={{ xl: 4, lg: 4, md: 2, sm: 0, base: 0 }}
                mb={0}
                w="100%"
                width="full"
              >
                {list}
              </SimpleGrid>
            </div>
            {props.fields.CallToAction && (
              <div className="featured-collection-call-to-action">
                <JssLink field={props.fields.CallToAction} />
              </div>
            )}
            {props.fields.Disclaimer && (
              <div className="featured-collection-disclaimer">
                <JssRichText field={props.fields.Disclaimer} />
              </div>
            )}
          </div>
        </Box>
      </Box>
    );
  }

  return <FeaturedCollectionFeaturedIconsComponent {...props} />;
};

const FeaturedCollectionRecentBlogsComponent = (props: FeaturedCollectionProps): JSX.Element => (
  <div className={`component featured-collection ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Featured Collection</span>
    </div>
  </div>
);
export const FeaturedBlogs = (props: FeaturedCollectionProps): JSX.Element => {
  let columnDesktopCount = 3;
  const columnMediumCount = 2;
  const columnSmallCount = 1;

  //Dynamically set the column count for desktop, medium and small are fixed today but could be authorable in the future
  {
    props.fields.CollectionItems.length > 3
      ? (columnDesktopCount = 4)
      : (columnDesktopCount = props.fields.CollectionItems.length);
  }
  const list = Object.values(props.fields.CollectionItems)
    .filter((element) => element)
    .map((element: FeaturedCollectionItems, key: number) => (
      <GridItem key={key}>
        <Box w="full" width="100%">
          <GridItem key={key}>
            <Box w="full" width="100%">
              <VStack
                h="full"
                width="full"
                w="100%"
                justifyContent="center"
                alignItems="center"
                p={2}
              >
                {element.fields.Image && <Image src={element?.fields?.Image?.value?.src} />}
                {props?.fields?.Title?.value && (
                  <Heading as="h3" fontWeight="semibold" fontSize="md">
                    {element?.fields?.Title?.value}
                  </Heading>
                )}
                {element?.fields?.Subhead?.value && (
                  <Text fontSize="sm">{element?.fields?.Subhead?.value}</Text>
                )}
                {element?.fields?.CallToAction?.value?.href && (
                  <Link
                    href={element?.fields?.CallToAction?.value?.href}
                    title={element?.fields?.CallToAction?.value?.title}
                  >
                    <Button
                      mt="10px"
                      variant={element?.fields?.CallToAction?.value?.class || 'primaryButton'}
                    >
                      {element?.fields?.CallToAction?.value?.text}
                    </Button>
                  </Link>
                )}
              </VStack>
            </Box>
          </GridItem>
        </Box>
      </GridItem>
    ));

  if (props.fields) {
    return (
      <Box
        maxW="container.xl"
        className={`component featured-collection ${props.params.styles}`}
        mb="40px"
        w="100%"
        width="full"
      >
        <Box className="component-content" w="100%" width="full">
          <div className="featured-collection-text">
            <div>
              {props.fields.Title && (
                <div className="featured-collection-title">
                  <JssRichText field={props.fields.Title} />
                </div>
              )}
            </div>
            <div className="featured-collection-items">
              <SimpleGrid
                columns={{
                  xl: columnDesktopCount,
                  lg: columnDesktopCount,
                  md: columnMediumCount,
                  sm: columnSmallCount,
                  base: columnSmallCount,
                }}
                gap={{ xl: 6, lg: 4, md: 2, sm: 0, base: 0 }}
                mt={{ xl: 4, lg: 4, md: 2, sm: 0, base: 0 }}
                mb={0}
                w="100%"
                width="full"
              >
                {list}
              </SimpleGrid>
            </div>
            {props.fields.CallToAction && (
              <div className="featured-collection-call-to-action">
                <JssLink field={props.fields.CallToAction} />
              </div>
            )}
            {props.fields.Disclaimer && (
              <div className="featured-collection-disclaimer">
                <JssRichText field={props.fields.Disclaimer} />
              </div>
            )}
          </div>
        </Box>
      </Box>
    );
  }

  return <FeaturedCollectionRecentBlogsComponent {...props} />;
};

const FeaturedCollectionSupplierLogosComponent = (props: FeaturedCollectionProps): JSX.Element => (
  <div className={`component featured-collection ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Featured Collection</span>
    </div>
  </div>
);
export const SupplierLogos = (props: FeaturedCollectionProps): JSX.Element => {
  let columnDesktopCount = 3;
  const columnMediumCount = 2;
  const columnSmallCount = 1;

  //Dynamically set the column count for desktop, medium and small are fixed today but could be authorable in the future
  {
    props.fields.CollectionItems.length > 3
      ? (columnDesktopCount = 4)
      : (columnDesktopCount = props.fields.CollectionItems.length);
  }
  const list = Object.values(props.fields.CollectionItems)
    .filter((element) => element)
    .map((element: FeaturedCollectionItems, key: number) => (
      <GridItem key={key}>
        <Box w="full" width="100%">
          <GridItem key={key}>
            <Box w="full" width="100%">
              <VStack
                h="full"
                width="full"
                w="100%"
                justifyContent="center"
                alignItems="center"
                p={2}
              >
                {element.fields.Image && <Image src={element?.fields?.Image?.value?.src} />}
                {props?.fields?.Title?.value && (
                  <Heading as="h3" fontWeight="semibold" fontSize="md">
                    {element?.fields?.Title?.value}
                  </Heading>
                )}
                {element?.fields?.Subhead?.value && (
                  <Text fontSize="sm">{element?.fields?.Subhead?.value}</Text>
                )}
                {element?.fields?.CallToAction?.value?.href && (
                  <Link
                    href={element?.fields?.CallToAction?.value?.href}
                    title={element?.fields?.CallToAction?.value?.title}
                  >
                    <Button
                      mt="10px"
                      variant={element?.fields?.CallToAction?.value?.class || 'primaryButton'}
                    >
                      {element?.fields?.CallToAction?.value?.text}
                    </Button>
                  </Link>
                )}
              </VStack>
            </Box>
          </GridItem>
        </Box>
      </GridItem>
    ));

  if (props.fields) {
    return (
      <Box
        maxW="container.xl"
        className={`component featured-collection ${props.params.styles}`}
        mb="40px"
        w="100%"
        width="full"
      >
        <Box className="component-content" w="100%" width="full">
          <div className="featured-collection-text">
            <div>
              {props.fields.Title && (
                <div className="featured-collection-title">
                  <JssRichText field={props.fields.Title} />
                </div>
              )}
            </div>
            <div className="featured-collection-items">
              <SimpleGrid
                columns={{
                  xl: columnDesktopCount,
                  lg: columnDesktopCount,
                  md: columnMediumCount,
                  sm: columnSmallCount,
                  base: columnSmallCount,
                }}
                gap={{ xl: 6, lg: 4, md: 2, sm: 0, base: 0 }}
                mt={{ xl: 4, lg: 4, md: 2, sm: 0, base: 0 }}
                mb={0}
                w="100%"
                width="full"
              >
                {list}
              </SimpleGrid>
            </div>
            {props.fields.CallToAction && (
              <div className="featured-collection-call-to-action">
                <JssLink field={props.fields.CallToAction} />
              </div>
            )}
            {props.fields.Disclaimer && (
              <div className="featured-collection-disclaimer">
                <JssRichText field={props.fields.Disclaimer} />
              </div>
            )}
          </div>
        </Box>
      </Box>
    );
  }

  return <FeaturedCollectionSupplierLogosComponent {...props} />;
};

const FeaturedCollectionTopCategoriesComponent = (props: FeaturedCollectionProps): JSX.Element => (
  <div className={`component featured-collection ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Featured Collection</span>
    </div>
  </div>
);
export const TopCategories = (props: FeaturedCollectionProps): JSX.Element => {
  let columnDesktopCount = 3;
  const columnMediumCount = 2;
  const columnSmallCount = 1;

  //Dynamically set the column count for desktop, medium and small are fixed today but could be authorable in the future
  {
    props.fields.CollectionItems.length > 3
      ? (columnDesktopCount = 4)
      : (columnDesktopCount = props.fields.CollectionItems.length);
  }
  const list = Object.values(props.fields.CollectionItems)
    .filter((element) => element)
    .map((element: FeaturedCollectionItems, key: number) => (
      <GridItem key={key}>
        <Box w="full" width="100%">
          <GridItem key={key}>
            <Box w="full" width="100%">
              <VStack
                h="full"
                width="full"
                w="100%"
                justifyContent="center"
                alignItems="center"
                p={2}
              >
                {element.fields.Image && <Image src={element?.fields?.Image?.value?.src} />}
                {props?.fields?.Title?.value && (
                  <Heading as="h3" fontWeight="semibold" fontSize="md">
                    {element?.fields?.Title?.value}
                  </Heading>
                )}
                {element?.fields?.Subhead?.value && (
                  <Text fontSize="sm">{element?.fields?.Subhead?.value}</Text>
                )}
                {element?.fields?.CallToAction?.value?.href && (
                  <Link
                    href={element?.fields?.CallToAction?.value?.href}
                    title={element?.fields?.CallToAction?.value?.title}
                  >
                    <Button
                      mt="10px"
                      variant={element?.fields?.CallToAction?.value?.class || 'primaryButton'}
                    >
                      {element?.fields?.CallToAction?.value?.text}
                    </Button>
                  </Link>
                )}
              </VStack>
            </Box>
          </GridItem>
        </Box>
      </GridItem>
    ));

  if (props.fields) {
    return (
      <Box
        maxW="container.xl"
        className={`component featured-collection ${props.params.styles}`}
        mb="40px"
        w="100%"
        width="full"
      >
        <Box className="component-content" w="100%" width="full">
          <div className="featured-collection-text">
            <div>
              {props.fields.Title && (
                <div className="featured-collection-title">
                  <JssRichText field={props.fields.Title} />
                </div>
              )}
            </div>
            <div className="featured-collection-items">
              <SimpleGrid
                columns={{
                  xl: columnDesktopCount,
                  lg: columnDesktopCount,
                  md: columnMediumCount,
                  sm: columnSmallCount,
                  base: columnSmallCount,
                }}
                gap={{ xl: 6, lg: 4, md: 2, sm: 0, base: 0 }}
                mt={{ xl: 4, lg: 4, md: 2, sm: 0, base: 0 }}
                mb={0}
                w="100%"
                width="full"
              >
                {list}
              </SimpleGrid>
            </div>
            {props.fields.CallToAction && (
              <div className="featured-collection-call-to-action">
                <JssLink field={props.fields.CallToAction} />
              </div>
            )}
            {props.fields.Disclaimer && (
              <div className="featured-collection-disclaimer">
                <JssRichText field={props.fields.Disclaimer} />
              </div>
            )}
          </div>
        </Box>
      </Box>
    );
  }

  return <FeaturedCollectionTopCategoriesComponent {...props} />;
};
