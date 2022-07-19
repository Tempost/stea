import IndivdualMember from "./indivdualmembership";

interface FormProps {
  formType: FormType;
}

function SteaJoinForm({ formType }: FormProps) {
  switch (formType) {
    case 'indivdual':
      return <IndivdualMember />
    default:
      return null;
  }
}

export default SteaJoinForm;
