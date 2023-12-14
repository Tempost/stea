import { ContactCard } from '@/components/ContactCard';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { ReactElement } from 'react';

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
        <ContactCard
          name={'Jennifer Owens'}
          position={'Secretary'}
          email={'Secretary@steventing.net'}
        />
        <ContactCard
          name={'Lynette Diamond'}
          position={'Treasurer'}
          email={'Stea@steventing.net'}
        />
        <ContactCard
          name={'Hannah Elbert'}
          position={'Adult Member at Large'}
        />
        <ContactCard
          name={'Willow Schwartz'}
          position={'Junior Member at Large'}
        />
        <ContactCard
          name={'Cat Schwartz'}
          position={'Social Media Manager'}
        />
        <ContactCard position={'Membership'} />
        <ContactCard position={'Points'} />
      </div>
    </section>
  );
}
ContactUs.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default ContactUs;
