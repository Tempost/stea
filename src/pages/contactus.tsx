import { ReactElement } from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { ContactCard } from '@/components/ContactCard';

function ContactUs() {
  return (
    <section>
      <h1 className='mx-auto w-fit text-lg font-bold text-neutral md:text-2xl'>
        Board Member Contact Information
      </h1>
      <div className='container m-10 mx-auto grid w-fit grid-cols-1 grid-rows-1 place-content-center items-center gap-10 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-3'>
        <ContactCard
          name={'Laura Sartwelle'}
          position={'President'}
          email={'President@steventing.net'}
        />
        <ContactCard
          name={'Markie Owen'}
          position={'Vice President'}
          email={'VP@steventing.net'}
        />
        <ContactCard position={'Secretary'} />
        <ContactCard
          name={'Lynette Diamond'}
          position={'Treasurer'}
          email={'Stea@steventing.net'}
        />
        <ContactCard position={'Director'} />
        <ContactCard position={'Junior Director'} />
        <ContactCard position={'Membership'} />
        <ContactCard position={'Points'} />
        <ContactCard position={'Social Media Manager'} />
      </div>
    </section>
  );
}
ContactUs.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default ContactUs;
