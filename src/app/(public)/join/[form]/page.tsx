import IndividualRegistration from './form/individual';
import HorseRegistration from './form/horse';
import BusinessRegistration from './form/business';

async function FormPage({ params }: any) {
  const { form } = await params;
  if (form === 'individual') return <IndividualRegistration />;
  if (form === 'horse') return <HorseRegistration />;
  if (form === 'business') return <BusinessRegistration />;
}

export default FormPage;
