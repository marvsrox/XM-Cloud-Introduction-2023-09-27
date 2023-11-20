import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FormEvent, FunctionComponent, useCallback, useEffect, useState } from 'react';
import { createLineItem, updateLineItem } from '../../../redux/ocCurrentOrder';
import { useOcDispatch, useOcSelector } from '../../../redux/ocStore';

import Card from 'components/card/Card';
import FavoritesListButton from './FavoritesButton';
import NextLink from 'next/link';
//import { Parser } from 'html-to-react';
import QuantityInput from './QuantityInput';
import { Spec } from 'ordercloud-javascript-sdk';
import useOcProductDetail from '../../../hooks/useOcProductDetail';
import formatPrice from 'src/utils/formatPrice';

// import FEAASProductDetails from "../products/ProductDetails_feaas"

interface ProductDetailProps {
  productId: string;
  lineItemId?: string;
  onLineItemAdded?: () => void;
  onLineItemUpdated?: () => void;
}

const determineDefaultOptionId = (spec: Spec) => {
  if (spec.DefaultOptionID) return spec.DefaultOptionID;
  return spec.OptionCount ? spec.Options[0].ID : undefined;
};

const OcProductDetail: FunctionComponent<ProductDetailProps> = ({
  productId,
  lineItemId,
  onLineItemAdded,
  onLineItemUpdated,
}) => {
  const dispatch = useOcDispatch();
  const { product, specs } = useOcProductDetail(productId);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [specValues, setSpecValues] = useState([]);

  const lineItem = useOcSelector((s) =>
    lineItemId && s.ocCurrentOrder.lineItems
      ? s.ocCurrentOrder.lineItems.find((li) => li.ID === lineItemId)
      : undefined
  );

  useEffect(() => {
    if (lineItem) {
      setSpecValues(lineItem.Specs);
    } else if (specs) {
      setSpecValues(
        specs.map((s) => {
          return {
            SpecID: s.ID,
            OptionID: determineDefaultOptionId(s),
            Value: s.DefaultValue ? s.DefaultValue : undefined,
          };
        })
      );
    }
  }, [specs, lineItem]);

  const [quantity, setQuantity] = useState(
    lineItem ? lineItem.Quantity : (product && product.PriceSchedule?.MinQuantity) || 1
  );

  const handleAddToCart = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setLoading(true);
      let xpValues = null;

      xpValues = {
        Type: product.xp.Type,
      };

      console.log('xp:' + xpValues);

      await dispatch(
        createLineItem({
          ProductID: product.ID,
          Quantity: quantity,
          Specs: specValues,
          xp: xpValues,
        })
      );
      setLoading(false);
      if (onLineItemAdded) {
        onLineItemAdded();
      }
    },
    [dispatch, product, quantity, onLineItemAdded, specValues]
  );

  const handleUpdateCart = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setLoading(true);
      await dispatch(updateLineItem({ ...lineItem, Quantity: quantity, Specs: specValues }));
      setLoading(false);
      if (onLineItemUpdated) {
        onLineItemUpdated();
      }
    },
    [dispatch, lineItem, quantity, onLineItemUpdated, specValues]
  );

  return product ? (
    <Card variant="" p="20">
      <FavoritesListButton></FavoritesListButton>
      <HStack alignItems="flex-start">
        <Box>
          <Image src={product.xp?.Images[0]?.ThumbnailUrl} aria-label={product.Name}></Image>
        </Box>
        <VStack textAlign="left" alignItems="left" p={3} position="relative" width="80%">
          <Box as={'header'}>
            <Heading as="h1" fontSize="28px">
              {product.Name}
            </Heading>
          </Box>
          <Box>
            <Text
              // eslint-disable-next-line react-hooks/rules-of-hooks
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'2xl'}
            >
              {formatPrice(product.PriceSchedule.PriceBreaks[0].Price)}
            </Text>
          </Box>
          <Box>
            {/* eslint-disable-next-line */}
            <p dangerouslySetInnerHTML={{ __html: product.Description }} />
          </Box>
          <HStack>
            <Box borderRight="1px" borderColor="gray.200" mr={2} pr={2}>
              <Text>{product.xp?.Calories}</Text>
            </Box>
            <Box>
              <Text>{product.xp?.Serving}</Text>
            </Box>
          </HStack>

          <form onSubmit={lineItem ? handleUpdateCart : handleAddToCart}>
            <VStack alignContent="flex-start" textAlign="left" alignItems="left" mt="20px">
              {/* TODO FINISH SPECS */}
              {/* {specs &&
              specs.map((s) => {
                const specValue = specValues.find((sv) => sv.SpecID === s.ID)
                return (
                  <ProductSpecField
                    key={s.ID}
                    spec={s}
                    onChange={handleSpecFieldChange}
                    optionId={specValue && specValue.OptionID}
                    value={specValue && specValue.Value}
                  />
                )
              })} */}
              <Box>
                <QuantityInput
                  controlId="addToCart"
                  priceSchedule={product.PriceSchedule}
                  quantity={quantity}
                  onChange={setQuantity}
                />
              </Box>
              <Button
                type="submit"
                disabled={loading}
                size="lg"
                maxW="225px"
                mt="20px"
                onClick={() => setIsModalOpen(true)}
              >
                {`${lineItem ? 'Update' : 'Add to Cart'} `}
              </Button>
            </VStack>
          </form>
        </VStack>
      </HStack>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Item added</ModalHeader>
          <ModalCloseButton />
          <ModalBody p="50">
            <Text>Item has been added to your cart!</Text>
            <HStack>
              <NextLink href={`/`} passHref>
                <Link color="gray.800">
                  <Button mt="10px" variant={'primaryButton'}>
                    <Text>Continue Shopping</Text>
                  </Button>
                </Link>
              </NextLink>
              <NextLink href={`/shopping-cart`} passHref>
                <Link color="gray.800">
                  <Button mt="10px" variant={'primaryButton'}>
                    <Text>Go to cart</Text>
                  </Button>
                </Link>
              </NextLink>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  ) : null;
};

export default OcProductDetail;
