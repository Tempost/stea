import NextLink from 'next/link';

import { PublicLayout } from '@/components/layout';

import { ReactElement } from 'react';
import Image from "next/legacy/image";
import { BookIcon } from '@/components/icons';
import NavCard from '@/components/navcard';
import { EOYPlacing, UpcomingEvents } from '@/components/home';

function Home() {
  return (
    <>
      <div className='hero min-h-screen bg-home-hero bg-fixed'>
        <div className='hero-overlay bg-opacity-50'></div>

        <div className='hero-content text-center text-neutral-content'>
          <div className='flex min-w-full flex-col items-center gap-5'>
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

      <div className='flex flex-col gap-5 p-5 md:gap-10 md:p-10'>
        <div className='mx-auto flex flex-col justify-around gap-5 md:flex-row md:flex-wrap'>
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

        <section className='card-compact container card mx-auto w-fit shadow-2xl'>
          <h2 className='text-center text-xl font-bold text-red-600 md:text-2xl lg:text-3xl'>
            Notice
          </h2>
          <div className='card-body'>
            <p className='text-center text-lg font-semibold md:text-2xl'>
              Please remember to check your points throughout the year!
            </p>
            <p className='inline-grid place-content-center text-xl md:text-2xl'>
              Review rule changes for 2023
              <a
                className='btn btn-primary btn-sm md:btn-xs'
                href='/stea_rule_book.pdf'
                rel='noopener noreferrer'
                target='_blank'
              >
                <span className='mr-1'>RuleBook</span> {BookIcon}
              </a>
            </p>
          </div>
        </section>

        <section className='mx-auto flex flex-col items-center gap-2'>
          <EOYPlacing />
        </section>

        <section className='mx-auto flex flex-col items-center gap-2'>
          <UpcomingEvents />
        </section>

        <section className='flex flex-col items-center gap-2'>
          <h1 className='text-2xl font-bold'>Recognized vendors</h1>
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
