import Image from 'next/image';
import { ReactElement } from 'react';

import { PublicLayout } from '@/components/layout';
import RidersTable from '@/components/tables/ridercombos';

function SteaPoints() {
  return (
    <div className='grid w-full place-items-center gap-20'>
      <RidersTable
        title='Current Points'
        search={true}
      />

      <div className='card w-[20em] shadow-2xl sm:w-[30em] md:w-[40em] lg:w-[45em]'>
        <figure className='relative h-[15em] sm:h-[25em] md:h-[30em] lg:h-[35em]'>
          <Image
            layout='fill'
            src='/points.jpg'
            alt='Displaying show rewards inside of arena'
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8f+lAPQAH+wLyQ96hbgAAAABJRU5ErkJggg=='
          />
        </figure>

        <div className='p-2'>
          <h2 className='text-center text-lg md:text-2xl'>
            Click here for more information on show points!
          </h2>
          <div className='card-actions justify-center'>
            <a
              className='btn btn-primary btn-sm md:btn-md'
              href='/stea_points.pdf'
              rel='noopener noreferrer'
              target='_blank'
            >
              Download Guidelines
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

SteaPoints.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default SteaPoints;
