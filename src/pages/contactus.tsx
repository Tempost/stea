import { ContactCard } from '@/components/ContactCard';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { mapping } from '@/server/utils';
import { trpc } from '@/utils/trpc';
import { ReactElement } from 'react';

function ContactUs() {
  const get = trpc.boardmember.all.useQuery();

  if (get.isLoading) {
    return <div className='rounded-b-lg p-5 shadow-xl'>Loading...</div>;
  }

  if (get.isError) {
    return <div className='rounded-b-lg p-5 shadow-xl'>Error...</div>;
  }

  return (
    <section>
      <h1 className='mx-auto w-fit text-lg font-bold text-neutral md:text-2xl'>
        Board Member Contact Information
      </h1>
      <div className='container m-10 mx-auto grid w-fit grid-cols-1 grid-rows-1 place-content-center items-center gap-10 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-3'>
        {get.data.map(({ position, ...boardmember }) => (
          <ContactCard
            key={position}
            position={mapping[position]}
            {...boardmember}
          />
        ))}
      </div>
    </section>
  );
}
ContactUs.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default ContactUs;
