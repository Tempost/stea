import IndivdualRegistration from './indivdual';
import HorseRegistration from './horseonly';
import BusinessRegistration from './business';
import FamilyRegistration from './family';

interface FormProps {
  formType: FormType;
}

function SteaJoinForm({ formType }: FormProps) {
  switch (formType) {
    case 'indivdual':
      return <IndivdualRegistration />;
    case 'horse':
      return <HorseRegistration />;
    case 'business':
      return <BusinessRegistration />;
    case 'family':
      return <FamilyRegistration />;
    default:
      return <h1 className='prose prose-2xl'>Invalid form selected...</h1>;
  }
}

export default SteaJoinForm;
