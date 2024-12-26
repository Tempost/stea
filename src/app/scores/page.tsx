import Image from 'next/image';
import { use } from 'react';

import PlacingsTable from '@/components/tables/Placings';
import { findMany } from '@/server/prisma/queries/shared';
import { Button } from '@/components/styled-ui/Button';

function SteaPoints() {
  const riders = use(
    findMany('RiderCombo', {
      orderBy: [
        {
          division: 'desc',
        },
        {
          member: {
            memberStatusType: 'asc',
          },
        },
        {
          totalPoints: 'desc',
        },
      ],
      select: {
        member: {
          select: {
            fullName: true,
            memberStatusType: true,
          },
        },
        horse: {
          select: {
            horseRN: true,
          },
        },
        shows: true,
        totalPoints: true,
        totalShows: true,
        division: true,
        showYear: true,
      },
    }),
  );

  return (
    <div className='grid w-full place-items-center gap-20'>
      <PlacingsTable
        title='Current Points'
        search
        paginate
        riders={riders}
      />

      <div className='card w-[20em] shadow-2xl sm:w-[30em] md:w-[40em] lg:w-[45em]'>
        <figure className='relative h-[15em] sm:h-[25em] md:h-[30em] lg:h-[35em]'>
          <Image
            src='/points.jpg'
            alt='Displaying show rewards inside of arena'
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8f+lAPQAH+wLyQ96hbgAAAABJRU5ErkJggg=='
            fill
            sizes='100vw'
          />
        </figure>

        <div className='p-2'>
          <h2 className='text-center text-lg md:text-2xl'>
            Click here for more information on show points!
          </h2>
          <div className='card-actions justify-center'>
            <a
              href='/stea_points.pdf'
              rel='noopener noreferrer'
              target='_blank'
            >
              <Button className='sm md:btn-md'>Download Guidelines</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SteaPoints;
