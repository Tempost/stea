import { PropsWithChildren, ReactElement } from 'react';
import { useAtom } from 'jotai';

import { formState } from '@/utils/atoms';
import { FormLayout } from '@/components/layout';
import { useFormContext } from 'react-hook-form';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { TMutation, trpc } from '@/utils/trpc';
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from '@paypal/paypal-js';

interface PaymentProps extends PropsWithChildren {
  showPayment: boolean;
  mutation: TMutation;
}

function Payment({ showPayment, children, mutation }: PaymentProps) {
  const mutator = trpc.useMutation([mutation]);
  const { handleSubmit } = useFormContext();
  const [state] = useAtom(formState);

  const amountOwed =
    state.memberCost + state.horses.lifeCost + state.horses.annualCost;

  function createOrder(data: CreateOrderData, actions: CreateOrderActions) {
    console.log('paypal data', data);
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

  function onApprove(data: OnApproveData, actions: OnApproveActions) {
    console.log(data, actions);

    return actions.order!.capture().then(details => {
      const name = details.payer.name?.given_name;
      console.log(name);
    });
  }

  return (
    <>
      {showPayment ? (
        <div className='grid place-content-center gap-5 border-solid border rounded-2xl border-gray-400 bg-gray-100 p-5'>
          <h4 className='font-bold text-lg'>
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
        children
      )}
    </>
  );
}

Payment.getLayout = (page: ReactElement) => {
  return <FormLayout>{page}</FormLayout>;
};

export default Payment;
