import NextLink from 'next/link';

import { PublicLayout } from '@/components/layout';

import { ReactElement } from 'react';
import Image from 'next/image';
import { BookIcon } from '@/components/icons';
import NavCard from '@/components/navcard';
import { EOYPlacing, UpcomingEvents } from '@/components/home';

function Home() {
  return (
    <>
      <div className='hero min-h-screen bg-home-hero bg-fixed'>
        <div className='hero-overlay bg-opacity-50'></div>

        <div className='hero-content text-neutral-content text-center'>
          <div className='flex flex-col items-center min-w-full gap-5'>
            <div className='w-[85%]'>
              <Image
                width={450}
                height={250}
                layout='intrinsic'
                src='/stea_logo_no_horse_border.svg'
                alt='STEA Logo'
              />
            </div>

            <h2 className='text-2xl md:text-3xl lg:text-4xl'>
              Where Your Eventing Journey Begins
            </h2>

            <NextLink
              href={'/join'}
              prefetch={false}
            >
              <button className='btn btn-primary btn-lg text-xl md:btn-xl md:text-2xl'>
                Join Today!
              </button>
            </NextLink>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-5 md:gap-10 p-5 md:p-10'>
        <div className='self-center flex flex-col md:flex-row md:flex-wrap justify-around gap-5'>
          <NavCard
            bodyText='Membership'
            href='/members-horses'
            img='/membership_landing.jpeg'
          />
          <NavCard
            bodyText='Shows'
            href='/calender'
            img='/shows_landing.jpg'
          />
          <NavCard
            bodyText='Points'
            href='/scores'
            img='/points_landing.png'
          />
        </div>

        <section className='card card-compact shadow-2xl w-fit  self-center'>
          <h2 className='text-center text-red-600 font-bold text-xl md:text-2xl lg:text-3xl'>
            Notice
          </h2>
          <div className='card-body'>
            <p className='text-lg md:text-2xl font-semibold text-center'>
              Please remeber to check your points throught the year!
            </p>
            <p className='inline-grid place-content-center text-xl md:text-2xl'>
              Review rule changes for 2023
              <button className='btn btn-primary btn-sm md:btn-xs'>
                <span className='mr-1'>Rule Book </span> {BookIcon}
              </button>
            </p>
          </div>
        </section>

        <section className='flex flex-col gap-2 self-center items-center'>
          <EOYPlacing />
        </section>

        <section className='flex flex-col gap-2 self-center items-center'>
          <UpcomingEvents />
        </section>

        <section className='flex flex-col gap-2 items-center'>
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
