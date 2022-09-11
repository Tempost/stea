import Link from 'next/link';

import { PublicLayout } from '@/components/layout';

import { ReactElement } from 'react';
import Image from 'next/image';
import { BookIcon, CalenderIcon } from '@/components/icons';

interface NavCardProps {
  img?: string; // TODO: Better type for this?
  bodyText: React.ReactNode;
}
function NavCard({ img, bodyText }: NavCardProps) {
  // <figure><Image src={img}/></figure>
  return (
    <div className='card card-compact shadow-2xl card-bordered bg-cyan-500'>
      <div className='card-body'>
        <p>{bodyText}</p>
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      <section>
        <div className='hero min-h-screen bg-home-hero bg-fixed'>
          <div className='hero-overlay bg-opacity-50'></div>

          <div className='hero-content text-neutral-content text-center'>
            <div className='flex flex-col items-center min-w-full gap-5'>
              <Image
                width={600}
                height={441}
                layout='intrinsic'
                src='/stea_logo_white.png'
              />

              <h2 className='text-5xl'>Where Your Eventing Journey Begins</h2>

              <Link href={'/join'}>
                <button
                  data-cy='join-link-button'
                  className='btn btn-primary btn-lg text-3xl'
                >
                  Join Today!
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className='px-20'>
        <div className='grid grid-flow-col justify-evenly'>
          <NavCard bodyText='Membership' />
          <NavCard bodyText='Calender' />
          <NavCard bodyText='Points' />
        </div>

        <section className='flex flex-col border-2 rounded-lg'>
          <h2>Notice</h2>
          <h3>Please remeber to check your points throught the year!</h3>
          <p className='inline-grid grid-flow-col gap-2'>
            Review rule changes for 2023
            <button className='btn btn-primary btn-xs grid grid-flow-col gap-2'>Rule Book {BookIcon}</button>
          </p>
        </section>

        <section className='flex flex-col items-center'>
          <h1 className='text-xl'> End of Year Placings</h1>
        </section>

        <section>
          <h2>Upcoming Events</h2>
          <button className='btn btn-primary btn-md grid place-content-center grid-flow-col gap-2'>
            {CalenderIcon} View Full Calender
          </button>

          {/* TODO: Grab shows happening in the next month and display here */}
          {/* TODO: Make some sort of event display component? */}
        </section>

        <section className='flex flex-col items-center'>
          <h1 className='text-xl'>Recognized vendors</h1>
          {/* TODO: List of vendors w/ photos */}
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default Home;
