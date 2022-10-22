import { ReactElement } from 'react';
import { PublicLayout } from '@/components/layout';

function SteaCalender() {
  return (
    <section className='flex h-full flex-col items-center justify-center'>
      <h1 className='mx-auto w-fit text-lg font-bold text-neutral md:text-2xl'>
        Coming soon...
      </h1>
    </section>
  );
}

SteaCalender.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default SteaCalender;
