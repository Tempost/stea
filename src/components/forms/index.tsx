import IndivdualMember from './indivdual';
import HorseRegistration from './horseonly';

interface FormProps {
  formType: FormType;
}

function SteaJoinForm({ formType }: FormProps) {
  switch (formType) {
    case 'indivdual':
      return <IndivdualMember />;
    case 'horse':
      return <HorseRegistration />;
    default:
      return <h1 className='prose prose-2xl'>To Be Built...</h1>;
  }
}

export default SteaJoinForm;
