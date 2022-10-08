import { ReactElement } from 'react';
import { PublicLayout } from '@/components/layout';

function SteaCalender() {
  return (
    <section className='flex flex-col justify-center items-center h-full'>
      <h1 className='text-lg md:text-2xl font-bold text-neutral mx-auto w-fit'>
        Coming soon...
      </h1>
    </section>
  );
}

SteaCalender.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default SteaCalender;
