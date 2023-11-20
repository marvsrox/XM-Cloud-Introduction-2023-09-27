import { Box, Button, HStack, Heading, Link, VStack } from '@chakra-ui/react';
import {
  Field,
  ImageField,
  Image as JssImage,
  LinkField,
  RichText,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';

import React from 'react';

interface Fields {
  PromoIcon: ImageField;
  PromoText: Field<string>;
  PromoLink: LinkField;
  PromoText2: Field<string>;
  PromoText3: Field<string>;
  PromoIcon2: ImageField;
}

type PromoProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const PromoDefaultComponent = (props: PromoProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Promo</span>
    </div>
  </div>
);

export const Default = (props: PromoProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`}>
        <HStack bg="gray.200" mt={20} mb={20} p={10}>
          <Box className="field-promoicon" w="60%">
            <JssImage field={props.fields.PromoIcon} />
          </Box>
          <Box
            className="component-content"
            bg="white"
            border="1px"
            borderColor="gray.300"
            alignSelf="stretch"
            justifyContent="stretch"
            width="full"
            p={20}
            w="35%"
          >
            <div className="promo-text">
              <div>
                <div className="field-promotext">
                  <h2>
                    <RichText className="promo-text" mb={10} field={props.fields.PromoText} />
                  </h2>
                </div>
              </div>
              <div className="field-promotext">
                <RichText className="promo-text" mb={10} field={props.fields.PromoText2} />
              </div>
            </div>
            {props?.fields?.PromoLink?.value?.href && (
              <Link
                href={props?.fields?.PromoLink?.value?.href}
                title={props?.fields?.PromoLink?.value?.title}
              >
                <Button
                  mt="20px"
                  variant={props?.fields?.PromoLink?.value?.class || 'primaryButton'}
                >
                  {props?.fields?.PromoLink?.value?.text}
                </Button>
              </Link>
            )}
          </Box>
        </HStack>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};

export const WithText = (props: PromoProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`}>
        <div className="component-content">
          <div className="field-promoicon">
            <JssImage field={props.fields.PromoIcon} />
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <h2>
                  <RichText className="promo-text" mb={10} field={props.fields.PromoText} />
                </h2>
              </div>
            </div>
            <div className="field-promotext">
              <Text className="promo-text" field={props.fields.PromoText2} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};

export const SmallPromo = (props: PromoProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`}>
        <HStack mt={20} mb={20} p={10}>
          <Box className="field-promoicon" w="60%">
            <JssImage field={props.fields.PromoIcon} />
          </Box>
          <Box
            className="component-content"
            alignSelf="stretch"
            justifyContent="stretch"
            width="full"
            p={20}
            w="40%"
          >
            <div className="promo-text">
              <HStack
                className="field-promotext"
                color="#a9283b"
                textTransform="uppercase"
                fontWeight="bold"
              >
                <h2>
                  <RichText className="promo-text" mb={10} field={props.fields.PromoText} />
                </h2>
              </HStack>
              <HStack textTransform="uppercase" fontWeight="bold" fontSize="40px">
                <RichText className="promo-text" mb={10} field={props.fields.PromoText2} />
              </HStack>
            </div>
            {props?.fields?.PromoLink?.value?.href && (
              <Link
                href={props?.fields?.PromoLink?.value?.href}
                title={props?.fields?.PromoLink?.value?.title}
              >
                <Button
                  mt="20px"
                  variant={props?.fields?.PromoLink?.value?.class || 'primaryButton'}
                >
                  {props?.fields?.PromoLink?.value?.text}
                </Button>
              </Link>
            )}
          </Box>
        </HStack>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};
export const SmallPromoFlipped = (props: PromoProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`}>
        <HStack mt={20} mb={20} p={10}>
          <Box
            className="component-content"
            alignSelf="stretch"
            justifyContent="stretch"
            width="full"
            p={20}
            w="40%"
          >
            <div className="promo-text">
              <HStack color="#a9283b" textTransform="uppercase" fontWeight="bold">
                <h2>
                  <RichText className="promo-text" mb={10} field={props.fields.PromoText} />
                </h2>
              </HStack>
              <HStack textTransform="uppercase" fontWeight="bold" fontSize="40px">
                <RichText className="promo-text" mb={10} field={props.fields.PromoText2} />
              </HStack>
            </div>
            {props?.fields?.PromoLink?.value?.href && (
              <Link
                href={props?.fields?.PromoLink?.value?.href}
                title={props?.fields?.PromoLink?.value?.title}
              >
                <Button
                  mt="20px"
                  variant={props?.fields?.PromoLink?.value?.class || 'primaryButton'}
                >
                  {props?.fields?.PromoLink?.value?.text}
                </Button>
              </Link>
            )}
          </Box>
          <Box className="field-promoicon" w="60%">
            <JssImage field={props.fields.PromoIcon} />
          </Box>
        </HStack>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};
export const BillboardPromo = (props: PromoProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`}>
        <VStack width="full" w="100%" position="relative">
          <Box
            className="field-promoicon"
            objectFit="cover"
            width="full"
            w="100%"
            borderRadius="20px"
          >
            <JssImage field={props.fields.PromoIcon} />
          </Box>
          <HStack mt={20} mb={20} width="full" w="100%" textAlign="center">
            <VStack width="full" w="100%" textAlign="center">
              <Heading as="h2" width="full" w="100%" mb="0px" fontSize="28px">
                <RichText
                  className="promo-text"
                  width="full"
                  w="100%"
                  mb="0px"
                  field={props.fields.PromoText}
                />
              </Heading>
              <Heading as="h1" width="full" w="100%" fontSize="45px">
                <RichText
                  className="promo-text"
                  width="full"
                  w="100%"
                  mb={2}
                  field={props.fields.PromoText2}
                />
              </Heading>
              <HStack width="full" w="100%" mb={5} pr="10%" pl="10%">
                <RichText
                  className="promo-text"
                  width="full"
                  w="100%"
                  fontSize="16px"
                  field={props.fields.PromoText3}
                />
              </HStack>
              <HStack width="full" w="100%" textAlign="center" alignContent="center">
                {props?.fields?.PromoLink?.value?.href && (
                  <Link
                    href={props?.fields?.PromoLink?.value?.href}
                    title={props?.fields?.PromoLink?.value?.title}
                    margin="0 auto"
                  >
                    <Button
                      mt="20px"
                      borderRadius="50px"
                      p="30px"
                      pr="40px"
                      pl="40px"
                      bg="#9d2235"
                      fontSize="18px"
                      variant={props?.fields?.PromoLink?.value?.class || 'primaryButton'}
                    >
                      {props?.fields?.PromoLink?.value?.text}
                    </Button>
                  </Link>
                )}
              </HStack>
            </VStack>
          </HStack>
          <Box className="field-promoicon" objectFit="cover" width="full" w="100%">
            <JssImage field={props.fields.PromoIcon2} />
          </Box>
        </VStack>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};
export const BillboardPromoFlipped = (props: PromoProps): JSX.Element => {
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`}>
        <VStack width="full" w="100%" position="relative">
          <HStack mt={20} mb={20} width="full" w="100%" textAlign="center">
            <VStack width="full" w="100%" textAlign="center">
              <Heading as="h2" width="full" w="100%" mb="0px" fontSize="28px">
                <RichText
                  className="promo-text"
                  width="full"
                  w="100%"
                  mb="0px"
                  field={props.fields.PromoText}
                />
              </Heading>
              <Heading as="h1" width="full" w="100%" fontSize="45px">
                <RichText
                  className="promo-text"
                  width="full"
                  w="100%"
                  mb={2}
                  field={props.fields.PromoText2}
                />
              </Heading>
              <HStack width="full" w="100%" mb={5} pr="10%" pl="10%">
                <RichText
                  className="promo-text"
                  width="full"
                  w="100%"
                  fontSize="16px"
                  field={props.fields.PromoText3}
                />
              </HStack>
              <HStack width="full" w="100%" textAlign="center" alignContent="center">
                {props?.fields?.PromoLink?.value?.href && (
                  <Link
                    href={props?.fields?.PromoLink?.value?.href}
                    title={props?.fields?.PromoLink?.value?.title}
                    margin="0 auto"
                  >
                    <Button
                      mt="20px"
                      borderRadius="50px"
                      p="30px"
                      pr="40px"
                      pl="40px"
                      bg="#9d2235"
                      fontSize="18px"
                      variant={props?.fields?.PromoLink?.value?.class || 'primaryButton'}
                    >
                      {props?.fields?.PromoLink?.value?.text}
                    </Button>
                  </Link>
                )}
              </HStack>
            </VStack>
          </HStack>
          <Box className="field-promoicon" objectFit="cover" width="full" w="100%" rounded={3}>
            <JssImage field={props.fields.PromoIcon} />
          </Box>
          <Box className="field-promoicon" objectFit="cover" width="full" w="100%">
            <JssImage field={props.fields.PromoIcon2} />
          </Box>
        </VStack>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};
