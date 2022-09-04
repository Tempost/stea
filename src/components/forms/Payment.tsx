import { formState } from '@/utils/atoms';
import { useAtom } from 'jotai';
import PayPalButton from './PayPalButton';

const costs = {
  individual: 65,
  annualPerHorse: 20,
  business: 65,
  life: 500,
  lifePerHorse: 150,
};

// TODO: Somehow save state from form (maybe atom?) and pick the correct mutation
// function to later store in DB after payment
// Add payment info to the form state stuff then send off to DB

function Payment() {
  const [state] = useAtom(formState);

  console.log(`Selection ${state.member} Horse count ${state.horses}`);

  return <PayPalButton />;
}

export default Payment;
