import {
  Box,
  Button,
  HStack,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { FormEvent, FunctionComponent, useCallback, useState } from 'react';
import { removeLineItem, updateLineItem } from '../../../redux/ocCurrentOrder';

import { LineItem } from 'ordercloud-javascript-sdk';
import { useOcDispatch } from '../../../redux/ocStore';
import useOcProduct from '../../../hooks/useOcProduct';
import OcQuantityInput from './OcQuantityInput';
import { HiOutlineAnnotation, HiOutlineX } from 'react-icons/hi';
import formatPrice from 'src/utils/formatPrice';

interface OcLineItemCardProps {
  lineItem: LineItem;
  editable?: boolean;
}

const OcLineItemCard: FunctionComponent<OcLineItemCardProps> = ({ lineItem, editable }) => {
  const dispatch = useOcDispatch();
  const [disabled, setDisabled] = useState(false);
  const [quantity, setQuantity] = useState(lineItem.Quantity);
  const product = useOcProduct(lineItem.ProductID);
  const [isDeliveryInstructionsModalOpen, setIsDeliveryInstructionsModalOpen] = useState(false);

  const handleRemoveLineItem = useCallback(async () => {
    setDisabled(true);
    await dispatch(removeLineItem(lineItem.ID));
    setDisabled(false);
  }, [dispatch, lineItem]);

  const handleUpdateLineItem = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setDisabled(true);
      await dispatch(updateLineItem({ ...lineItem, Quantity: quantity }));
      setDisabled(false);
    },
    [dispatch, quantity, lineItem]
  );

  // const isUpdateDisabled = useMemo(() => {
  //   return disabled || lineItem.Quantity === quantity
  // }, [lineItem, disabled, quantity])

  return (
    <VStack w="100%" width="full">
      <HStack w="100%" width="full" justifyContent="space-between">
        <VStack justifyContent="flex-start" w="50%" textAlign="left" alignItems="flex-start">
          <Text>{lineItem.Product.Name}</Text>
          <Text>Item no: {lineItem.Product.ID}</Text>
        </VStack>
        <HStack w="10%" justifyContent="center">
          <Text>{formatPrice(lineItem.LineSubtotal)}</Text>
        </HStack>
        {editable ? (
          <>
            {/* <HStack justifyContent="flex-end">
             <Link href={`/products/${lineItem.ProductID}?lineitem=${lineItem.ID}`}>
            <a aria-label="Edit Line Item">Edit</a>
          </Link> 
          </HStack> */}
            <HStack w="10%" justifyContent="center">
              <Box>
                {product && (
                  <form onSubmit={handleUpdateLineItem}>
                    <OcQuantityInput
                      controlId={`${lineItem.ID}_quantity`}
                      quantity={quantity}
                      disabled={disabled}
                      onChange={setQuantity}
                      priceSchedule={product.PriceSchedule}
                    />
                    {/* <Button
                        type="submit"
                        aria-label="Update Line Item Quantity"
                        disabled={isUpdateDisabled}
                        variant='link'
                        fontWeight='normal'
                      >
                        Update
                      </Button> */}
                  </form>
                )}
              </Box>
            </HStack>
          </>
        ) : (
          <HStack w="10%" justifyContent="center">{`Quantity: ${lineItem.Quantity}`}</HStack>
        )}
        <HStack w="10%" justifyContent="center">
          <Text>{formatPrice(lineItem.LineSubtotal)}</Text>
        </HStack>
        <HStack>
          <Link color="brand.500" onClick={() => setIsDeliveryInstructionsModalOpen(true)}>
            <HiOutlineAnnotation fontSize="36px" color="brand.500" />
          </Link>

          <Button
            variant="link"
            fontWeight="normal"
            color="red.500"
            fontSize="10"
            aria-label="Remove Line Item"
            type="button"
            disabled={disabled}
            onClick={handleRemoveLineItem}
          >
            <HiOutlineX fontSize="36px" color="brand.500" />
          </Button>
        </HStack>
      </HStack>

      <Modal
        isOpen={isDeliveryInstructionsModalOpen}
        onClose={() => setIsDeliveryInstructionsModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent width="full" w="100%" maxWidth="800px">
          <ModalHeader>
            <Heading>Add Delivery Instructions</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Textarea placeholder="Delivery instructions" height="175px" />
              <HStack
                w="100%"
                width="full"
                justifyItems="space-between"
                justifyContent="space-between"
                mb={6}
              >
                <Button
                  type="button"
                  aria-describedby="ae-checkout-tip"
                  border="1px"
                  borderColor="gray.300"
                  variant="primaryButton"
                  height="50px"
                  onClick={() => setIsDeliveryInstructionsModalOpen(false)}
                >
                  <Text fontSize="18px">Add Delivery Instructions</Text>
                </Button>
                <Button
                  type="button"
                  aria-describedby="ae-checkout-tip"
                  border="1px"
                  borderColor="gray.300"
                  variant="secondaryButton"
                  height="50px"
                  onClick={() => setIsDeliveryInstructionsModalOpen(false)}
                >
                  <Text fontSize="18px">Cancel</Text>
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default OcLineItemCard;
