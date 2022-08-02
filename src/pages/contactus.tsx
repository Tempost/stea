import { PublicLayout } from '@/components/layout';
function ContactUs() {}
import { ReactElement } from 'react';
ContactUs.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default ContactUs;
