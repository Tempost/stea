import { use } from 'react';

import PlacingsTable from '@/components/tables/Placings';
import { findMany } from '@/server/prisma/queries/shared';
import { Button } from '@/components/styled-ui/Button';
import { unstable_cache } from 'next/cache';
import Card from '@/components/card/Card';
import LinkWrapper from '@/components/LinkWrapper';

const getRiders = unstable_cache(
  async () =>
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
  ['RiderCombos'],
  { revalidate: 3600, tags: ['RiderCombos'] },
);

function SteaPoints() {
  const riders = use(getRiders());

  return (
    <div className='grid w-full place-items-center gap-20'>
      <PlacingsTable
        title='Current Points'
        search
        paginate
        riders={riders}
      />

      <Card className='w-[20em] shadow-xl sm:w-[30em] md:w-[40em] lg:w-[45em]'>
        <Card.Image
          src='/points.jpg'
          alt='Displaying show rewards inside of arena'
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8f+lAPQAH+wLyQ96hbgAAAABJRU5ErkJggg=='
          width={1920}
          height={1080}
          sizes='100vw'
        />
        <Card.Body>
          <Card.Title
            tag='h2'
            className='text-center text-lg md:text-2xl'
          >
            Click below for more information on show points!
          </Card.Title>
          <Card.Actions className='justify-center'>
            <LinkWrapper
              href='/stea_points_2026.pdf'
              target='_blank'
            >
              <Button
                variant='primary'
                size='sm'
                className='md:btn-md'
              >
                Download Guidelines
              </Button>
            </LinkWrapper>
          </Card.Actions>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SteaPoints;
