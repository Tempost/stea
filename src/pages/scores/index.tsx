import Image from 'next/image';
import { ReactElement } from 'react';

import { PublicLayout } from '@/components/layout';
import RidersTable from '@/components/tables/ridercombos';

function SteaPoints() {
  // TODO: Better responsiveness
  return (
    <div className='w-full grid place-items-center gap-20'>
      <RidersTable title='Current Points' />

      <div className='card w-[20em] sm:w-[30em] md:w-[40em] lg:w-[45em] shadow-2xl'>
        <figure className='h-[15em] sm:h-[25em] md:h-[30em] lg:h-[35em] relative'>
          <Image
            layout='fill'
            src='/points.jpg'
            alt='Displaying show rewards inside of arena'
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8f+lAPQAH+wLyQ96hbgAAAABJRU5ErkJggg=='
          />
        </figure>

        <div className='p-2'>
          <h2 className='text-lg md:text-2xl text-center'>
            Click here for more information on show points!
          </h2>
          <div className='card-actions justify-center'>
            <a
              className='btn btn-primary btn-sm md:btn-md'
              href='/stea_points.docx'
              rel='noopener noreferrer'
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
