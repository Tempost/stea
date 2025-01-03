import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
  PurchaseUnit,
} from '@paypal/paypal-js';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { FormType } from '@/types/common';
import { costs } from '@/utils/costs';
import { cn } from '@/utils/helpers';
import { MemberForm, OwnerHorseForm } from '@/utils/zodschemas';
import {
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from '@paypal/react-paypal-js';
import { Button } from '../styled-ui/Button';
import PayPalButton from '../styled-ui/PayPalButton';
import Alert from './Alert';

interface PaymentProps extends PropsWithChildren {
  showPayment: boolean;
  formState: {
    error: boolean;
    message?: string;
    data: MemberForm | OwnerHorseForm | undefined;
  };
  onPayment: () => void;
  pending: boolean;
}

const initOptions: ReactPayPalScriptOptions = {
  'client-id':
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID,
  currency: 'USD',
  intent: 'capture',
  'data-react-paypal-script-id': 'paypal-button',
};

function Payment({
  showPayment,
  children,
  formState,
  onPayment,
  pending,
}: PaymentProps) {
  const history = useRouter();

  let amountOwed = 0;
  if (formState.data && 'memberStatus' in formState.data) {
    const memberCost =
      costs[formState.data.memberStatus][
        formState.data.memberType.toLocaleLowerCase() as FormType
      ];

    amountOwed += memberCost;
  }

  if (formState.data?.horses) {
    const lifeCount = formState.data.horses.filter(
      horse => horse.regType === 'Life',
    ).length;
    amountOwed += lifeCount * costs.Life['horse'];

    const annualCount = formState.data.horses.filter(
      horse => horse.regType === 'Annual',
    ).length;
    amountOwed += annualCount * costs.Annual['horse'];
  }

  function createPurchaseUnits(data: PaymentProps['formState']['data']) {
    const purchase_units: Array<PurchaseUnit> = [];
    if (!data) return purchase_units;
    const { horses, ...member } = data;

    if ('memberType' in member) {
      purchase_units.push({
        description: `${member.memberStatus} membership for ${member.firstName} ${member.lastName}`,
        amount: {
          currency_code: 'USD',
          value:
            costs[member.memberStatus][
              member.memberType.toLowerCase() as FormType
            ].toString(),
        },
      });
    }

    if (horses) {
      const test = horses.map(horse => {
        return {
          description: `${horse.regType} registration for ${horse.horseRN}`,
          amount: {
            currency_code: 'USD',
            value: costs[horse.regType]['horse'].toString(),
          },
        };
      });
      purchase_units.push(...test);
    }

    return purchase_units;
  }

  function createOrder(_: CreateOrderData, actions: CreateOrderActions) {
    return actions.order.create({
      intent: 'CAPTURE',
      application_context: {
        shipping_preference: 'NO_SHIPPING',
      },
      purchase_units: createPurchaseUnits(formState.data),
    });
  }

  // TODO: Instead of redirecting to home page how about in the same window
  // acknowledge that payment was a success
  async function onApprove(_data: OnApproveData, actions: OnApproveActions) {
    return actions.order!.capture().then(() => {
      onPayment();
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
              message={formState.message ?? ''}
              visible={formState.error}
            />
            <Button
              type='submit'
              variant='primary'
              className={cn('w-full', { loading: pending })}
              disabled={pending}
            >
              {pending ? '' : 'Move to payment'}
            </Button>
          </>
        )}
      </PayPalScriptProvider>
    </>
  );
}

export default Payment;
