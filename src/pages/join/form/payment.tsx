import { formState } from '@/utils/atoms';
import { useAtom } from 'jotai';
import PayPalButton from '@/components/forms/PayPalButton';

// TODO: Use this button on each form, don't save formstate in atom, have form onSubmit after finishing payment
// that way we don't need to do weird stuff with saving form state in atoms

function Payment() {
  const [state] = useAtom(formState);
  console.log(state);

  return (
    <div>
      <div className='bg-gray-200'>Your sign-up costs ${}</div>

      <PayPalButton />
    </div>
  );
}

export default Payment;
