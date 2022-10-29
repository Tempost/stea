import { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { PayPalButtons } from '@paypal/react-paypal-js';
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from '@paypal/paypal-js';

import { formState } from '@/utils/atoms';
import Alert from './Alert';
import { TMutation, trpc } from '@/utils/trpc';
import { useFormContext } from 'react-hook-form';

interface PaymentProps extends PropsWithChildren {
  showPayment: boolean;
  query: {
    error: boolean;
    message?: string;
    mutation: TMutation;
  };
}

function Payment({ showPayment, children, query }: PaymentProps) {
  const history = useRouter();
  const insert = trpc.useMutation([query.mutation], {});

  const { getValues } = useFormContext();

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

  async function onApprove(_: OnApproveData, actions: OnApproveActions) {
    return actions.order!.capture().then(details => {
      const name = details.payer.name?.given_name;

      insert.mutate(getValues());
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
          <button className='w-full'>
            <PayPalButtons
              fundingSource='paypal'
              style={{
                layout: 'horizontal',
                color: 'blue',
                label: 'paypal',
                tagline: false,
              }}
              createOrder={createOrder}
              onApprove={onApprove}
            />
          </button>
        </div>
      ) : (
        <>
          {children}
          <Alert
            message={query.message ?? ''}
            visible={query.error}
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
