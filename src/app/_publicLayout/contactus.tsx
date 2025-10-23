import { createFileRoute } from '@tanstack/react-router';
import { getBoardMembers } from '../../server/functions/serverFunctions';
import { ContactCard } from '@/components/ContactCard';
import { mapping } from '@/server/utils';

export const Route = createFileRoute('/_publicLayout/contactus')({
  component: ContactUs,
  loader: () => getBoardMembers(),
});

function ContactUs() {
  const boardmembers = Route.useLoaderData();

  return (
    <section className='p-4 sm:p-8 md:p-10 lg:p-16'>
      <h1 className='text-neutral mx-auto w-fit text-lg font-bold md:text-2xl'>
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
