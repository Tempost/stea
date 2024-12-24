import { PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
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
import { Button } from '../styled-ui/Button';
import {
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from '@paypal/react-paypal-js';

interface PaymentProps extends PropsWithChildren {
  showPayment: boolean;
  formMutation: {
    error: boolean;
    message?: string;
    mutateFn: () => void;
  };
}

const initOptions: ReactPayPalScriptOptions = {
  'client-id':
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID,
  currency: 'USD',
  intent: 'capture',
  'data-react-paypal-script-id': 'paypal-button',
};

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
    return actions.order!.capture().then(() => {
      formMutation.mutateFn();
      history.push('/');
    });
  }

  return (
    <>
      <PayPalScriptProvider options={initOptions}>
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
            <Button
              type='submit'
              className='w-full'
            >
              Move to payment
            </Button>
          </>
        )}
      </PayPalScriptProvider>
    </>
  );
}

export default Payment;
