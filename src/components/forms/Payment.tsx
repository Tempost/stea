import { PropsWithChildren, ReactElement } from 'react';
import { useAtom } from 'jotai';

import { formState } from '@/utils/atoms';
import PayPalButton from '@/components/forms/PayPalButton';
import { FormLayout } from '@/components/layout';
import { useFormContext } from 'react-hook-form';

interface PaymentProps extends PropsWithChildren {
  showPayment: boolean;
}

function Payment({ showPayment, children }: PaymentProps) {
  const methods = useFormContext();
  const [state] = useAtom(formState);
  const amountOwed =
    state.memberCost + state.horses.lifeCost + state.horses.annualCost;
  return (
    <>
      {showPayment ?
          <div className='grid place-content-center gap-5 border-solid border rounded-2xl border-gray-400 bg-gray-100 p-5'>
            <h4 className='font-bold text-lg'>
              Your sign-up costs ${amountOwed} USD
            </h4>
            <PayPalButton amountOwed={amountOwed}/>
          </div>
        :
        children
      }
    </>
  );
}

Payment.getLayout = (page: ReactElement) => {
  return <FormLayout>{page}</FormLayout>;
};

export default Payment;
