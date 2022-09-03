import IndividualRegistration from './individual';
import HorseRegistration from './horseonly';
import BusinessRegistration from './business';
import Payment from './Payment';
import { useAtom } from 'jotai';
import { formState } from '@/utils/atoms';

function SteaJoinForm() {
  const [state] = useAtom(formState);

  switch (state.selection) {
    case 'individual':
      return <IndividualRegistration />;
    case 'horse':
      return <HorseRegistration />;
    case 'business':
      return <BusinessRegistration />;
    case 'payment':
      return <Payment />;
    default:
      return <h1 className='prose prose-2xl'>Invalid form selected...</h1>;
  }
}

export default SteaJoinForm;
