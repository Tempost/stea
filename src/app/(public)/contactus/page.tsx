import { ContactCard } from '@/components/ContactCard';
import { findMany } from '@/server/prisma/queries/shared';
import { mapping } from '@/server/utils';
import { unstable_cache } from 'next/cache';
import { use } from 'react';

export const revalidate = 3600;

const getBoardMembers = unstable_cache(
  async () => {
    return await findMany('Boardmember');
  },
  ['Boardmembers'],
  { revalidate: 3600, tags: ['Boardmembers'] },
);

function ContactUs() {
  const boardmembers = use(getBoardMembers());

  return (
    <section>
      <h1 className='mx-auto w-fit text-lg font-bold text-neutral md:text-2xl'>
        Board Member Contact Information
      </h1>
      <div className='container m-10 mx-auto grid w-fit grid-cols-1 grid-rows-1 place-content-center items-center gap-10 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-3'>
        {boardmembers.map(({ position, ...boardmember }) => (
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

export default ContactUs;
