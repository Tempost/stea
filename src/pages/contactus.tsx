import { ReactElement } from 'react';
import { PublicLayout } from '@/components/layout';
function ContactUs() {}
ContactUs.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default ContactUs;
