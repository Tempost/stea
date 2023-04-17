import { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from '@paypal/paypal-js';

import { formState } from '@/utils/atoms';
import Alert from './Alert';
import PayPalButton from '../styled-ui/PayPalButton';

interface PaymentProps extends PropsWithChildren {
  showPayment: boolean;
  formMutation: {
    error: boolean;
    message?: string;
    mutateFn: () => void;
  };
}

function Payment({ showPayment, children, formMutation }: PaymentProps) {
  const history = useRouter();

  const [state] = useAtom(formState);

  const amountOwed =
    state.memberCost + state.horses.lifeCost + state.horses.annualCost;

  function createOrder(_: CreateOrderData, actions: CreateOrderActions) {
    return actions.order.create({
      intent: 'CAPTURE',
      application_context: {
        shipping_preference: 'NO_SHIPPING',
      },
      purchase_units: [
        {
          amount: {
            value: amountOwed.toString(),
            currency_code: 'USD',
          },
          description: 'STEA registration',
        },
      ],
    });
  }

  async function onApprove(_data: OnApproveData, actions: OnApproveActions) {
    return actions.order!.capture().then(details => {
      const name = details.payer.name?.given_name;

      formMutation.mutateFn();
      history.push('/');
    });
  }

  return (
    <>
      {showPayment ? (
        <div className='grid place-content-center gap-5 rounded-2xl border border-solid border-gray-400 bg-gray-100 p-5'>
          <h4 className='text-lg font-bold'>
            Your sign-up costs ${amountOwed} USD
          </h4>
          <PayPalButton
            createOrder={createOrder}
            onApprove={onApprove}
          />
        </div>
      ) : (
        <>
          {children}
          <Alert
            message={formMutation.message ?? ''}
            visible={formMutation.error}
          />
          <button
            type='submit'
            className='btn-primary btn w-full'
          >
            Move to payment
          </button>
        </>
      )}
    </>
  );
}

export default Payment;
