import IndividualRegistration from './individual';
import HorseRegistration from './horseonly';
import BusinessRegistration from './business';

interface FormProps {
  formType: FormType;
}

function SteaJoinForm({ formType }: FormProps) {
  switch (formType) {
    case 'individual':
      return <IndividualRegistration />;
    case 'horse':
      return <HorseRegistration />;
    case 'business':
      return <BusinessRegistration />;
    default:
      return <h1 className='prose prose-2xl'>Invalid form selected...</h1>;
  }
}

export default SteaJoinForm;
