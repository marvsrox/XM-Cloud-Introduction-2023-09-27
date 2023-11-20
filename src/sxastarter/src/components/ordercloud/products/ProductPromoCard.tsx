import {
  Box,
  Button,
  HStack,
  Text,
  Link,
  Image,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
// import { Parser } from 'html-to-react';
// import formatFeatureCopy from 'src/utils/formatFeatureCopy';
import useOcProductDetail from '../../../hooks/useOcProductDetail';
// import formatPoints from 'src/utils/formatPoints';
import NextLink from 'next/link';
import formatPrice from 'src/utils/formatPrice';

// import FEAASProductDetails from "../products/ProductDetails_feaas"

interface ProductDetailProps {
  productId: string;
  submitButton: LinkField;
  styles: string;
  onLineItemAdded?: () => void;
  onLineItemUpdated?: () => void;
}

const ProductPromoCard: FunctionComponent<ProductDetailProps> = ({
  productId,
  submitButton,
  styles,
}) => {
  const { product } = useOcProductDetail(productId);

  return product ? (
    <Box className={`component product-promo ${styles}`} position="relative" w="100%" width="full">
      <HStack bg="gray.200" mt={20} mb={20} p={10} w="100%" width="full">
        <Box className="product-promo-image" w="60%">
          <Image
            src={product.xp?.Images[0]?.Url}
            aria-label={product.Name}
            style={{ width: '100%' }}
          ></Image>
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
          <VStack w="100%" width="full" textAlign="left">
            <h2>{product.Name}</h2>
            <Box w="100%" width="full" textAlign="left">
              <Text
                // eslint-disable-next-line react-hooks/rules-of-hooks
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight={300}
                fontSize={'2xl'}
              >
                {formatPrice(product.PriceSchedule.PriceBreaks[0].Price)}
              </Text>
            </Box>
            <VStack w="100%" width="full" textAlign="left">
              <Text w="100%" width="full">
                {product.xp?.Calories}
              </Text>
              <Text w="100%" width="full">
                {product.xp?.Serving}
              </Text>
            </VStack>
          </VStack>
          {submitButton.value?.href && (
            <NextLink href={`product-details?productid=${product.ID}`} passHref>
              <Link title={submitButton.value?.title}>
                <Button mt="20px" variant={submitButton.value?.class || 'primaryButton'}>
                  {submitButton.value?.text}
                </Button>
              </Link>
            </NextLink>
          )}
        </Box>
      </HStack>
    </Box>
  ) : null;
};

export default ProductPromoCard;
