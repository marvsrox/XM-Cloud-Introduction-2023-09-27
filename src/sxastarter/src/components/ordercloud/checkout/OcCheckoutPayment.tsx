import React from 'react';
import {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { OcCheckoutStepProps } from './steppedcheckout';
import useOcCurrentOrder from '../../../hooks/useOcCurrentOrder';
import { addPayment, removePayment } from '../../../redux/ocCurrentOrder';
import { useOcDispatch } from '../../../redux/ocStore';
import formatPrice from '../../../utils/formatPrice';
import { VStack, Heading, Text, Button, HStack, Divider } from '@chakra-ui/react';
import { HiChevronDoubleRight, HiChevronDoubleLeft } from 'react-icons/hi';

const OcCheckoutPayment: FunctionComponent<OcCheckoutStepProps> = ({ onNext, onPrev }) => {
  const dispatch = useOcDispatch();
  const { order, payments } = useOcCurrentOrder();

  const amountDue = useMemo(() => {
    if (!order) return 0;
    if (!payments || (payments && !payments.length)) return order.Total;
    return order.Total - payments.map((p) => p.Amount).reduceRight((p, c) => p + c);
  }, [order, payments]);

  const [pendingPayment, setPendingPayment] = useState(amountDue);

  const handleAddPayment = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(addPayment({ Type: 'PurchaseOrder', Amount: pendingPayment }));
    },
    [dispatch, pendingPayment]
  );

  const handleRemovePayment = useCallback(
    (paymentId: string) => () => {
      dispatch(removePayment(paymentId));
    },
    [dispatch]
  );

  useEffect(() => {
    setPendingPayment(amountDue);
  }, [amountDue]);

  const handlePendingPaymentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPendingPayment(Number(e.target.value));
  };

  return (
    <VStack w="100%" width="full">
      <Heading as="h2">Payment</Heading>
      <Heading as="h3">{`Amount Due ${formatPrice(amountDue)}`}</Heading>
      {payments &&
        payments.map((p) => (
          <div key={p.ID}>
            <p>
              {p.Type}
              <b>{` ${formatPrice(p.Amount)}`}</b>
            </p>
            <Button type="button" onClick={handleRemovePayment(p.ID)}>
              Remove Payment
            </Button>
          </div>
        ))}
      <form id="checkout_payment" onSubmit={handleAddPayment}>
        <label htmlFor="checkout_pending_payment">
          <Text>Payment Amount</Text>
          <input
            id="checkout_pending_payment"
            type="number"
            max={amountDue}
            min="1"
            value={pendingPayment}
            step="0.01"
            onChange={handlePendingPaymentChange}
          />
        </label>
        <Button type="submit" disabled={!amountDue}>
          Add Payment
        </Button>
      </form>
      <Divider />
      <HStack w="100%" width="full" justifyContent="space-between">
        <Button
          type="button"
          onClick={onPrev}
          bgColor="white"
          color="brand.500"
          border="1px"
          borderColor="brand.500"
          leftIcon={<HiChevronDoubleLeft />}
        >
          Edit Billing
        </Button>
        <Button
          type="button"
          onClick={onNext}
          disabled={!!amountDue}
          bgColor="brand.500"
          color="white"
          rightIcon={<HiChevronDoubleRight />}
        >
          Review Order
        </Button>
      </HStack>
    </VStack>
  );
};

export default OcCheckoutPayment;
