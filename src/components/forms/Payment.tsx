import { formState } from '@/utils/atoms';
import { useAtom } from 'jotai';
import PayPalButton from '@/components/forms/PayPalButton';

// TODO: Use this button on each form, don't save formstate in atom, have form onSubmit after finishing payment
// that way we don't need to do weird stuff with saving form state in atoms

function Payment() {
  const [state] = useAtom(formState);

  const amountOwed =
    state.memberCost + state.horses.lifeCost + state.horses.annualCost;

  console.log(amountOwed);
  return (
    <div className='grid place-content-center gap-5 border-solid border rounded-2xl border-gray-400 bg-gray-100 p-5'>
      <h4 className='font-bold text-lg'>
        Your sign-up costs ${amountOwed} USD
      </h4>
      <PayPalButton amountOwed={amountOwed} />
    </div>
  );
}

export default Payment;
