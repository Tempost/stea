import { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { FieldValues, useFormContext } from 'react-hook-form';
import { PayPalButtons } from '@paypal/react-paypal-js';
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from '@paypal/paypal-js';

import { formState } from '@/utils/atoms';
import { TMutation, trpc } from '@/utils/trpc';

interface PaymentProps extends PropsWithChildren {
  showPayment: boolean;
  mutation: TMutation;
  formValidation: () => void;
}

function Payment({
  showPayment,
  children,
  mutation,
  formValidation,
}: PaymentProps) {
  const history = useRouter();
  const mutator = trpc.useMutation([mutation]);
  const { handleSubmit } = useFormContext();
  const [state] = useAtom(formState);

  const amountOwed =
    state.memberCost + state.horses.lifeCost + state.horses.annualCost;

  function createOrder(data: CreateOrderData, actions: CreateOrderActions) {
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

  function onSubmit(values: FieldValues) {
    mutator.mutate({ ...values });
  }

  async function onApprove(data: OnApproveData, actions: OnApproveActions) {
    return actions.order!.capture().then(details => {
      const name = details.payer.name?.given_name;
      console.log(details);
      console.log(name);
      handleSubmit(onSubmit)().then(() => history.push('/'));
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
          <button
            type='button'
            className='btn btn-primary w-full'
            onClick={() => formValidation()}
          >
            Move to payment
          </button>
        </>
      )}
    </>
  );
}

export default Payment;
