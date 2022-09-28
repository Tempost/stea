import Payment from '@/components/forms/Payment';
import { useFormContext } from 'react-hook-form';

interface FinishPaymentProps {
  triggerValidation: () => void;
}

// TODO: JUST MOVE PAYMENT TO ANOTHER SCREEN
function FinishPayment({ triggerValidation }: FinishPaymentProps) {
  const methods = useFormContext();
  console.log(methods.formState.isValid)
  return (
    <>
      {methods.formState.isValid ? (
        <Payment />
      ) : (
        <button
          type='button'
          className='btn btn-primary w-full'
          onClick={() => triggerValidation()}
        >
          Move to payment
        </button>
      )}
    </>
  );
}

export default FinishPayment;
