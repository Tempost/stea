import { createFileRoute } from '@tanstack/react-router';

import Card from '@/components/card/Card';
import { Button } from '@/components/styled-ui/Button';
import PlacingsTable from '@/components/tables/Placings';
import { getRiders } from '../../server/functions/serverFunctions';

export const Route = createFileRoute('/_publicLayout/points')({
  component: SteaPoints,
  loader: () => getRiders(),
});

function SteaPoints() {
  const riders = Route.useLoaderData();

  return (
    <div className='grid w-full place-items-center gap-20 p-4 sm:p-8 md:p-10 lg:p-16'>
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
          sizes='100vw, 75vw, 50vw'
          layout='fullWidth'
        />
        <Card.Body className='place-items-center'>
          <Card.Title
            tag='h2'
            className='text-lg md:text-2xl'
          >
            See below for more information on our points system!
          </Card.Title>
          <Card.Actions>
            <a
              href='/stea_points.pdf'
              rel='noopener noreferrer'
            >
              <Button
                variant='primary'
                size='sm'
                className='md:btn-md'
              >
                View Guidelines
              </Button>
            </a>
          </Card.Actions>
        </Card.Body>
      </Card>
    </div>
  );
}
