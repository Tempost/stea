import NextLink from 'next/link';

import { PublicLayout } from '@/components/layout/PublicLayout';

import UpcomingEvents from '@/components/home/Events';
import NavCard from '@/components/home/NavCard';
import { BookIcon, CalendarIcon } from '@/components/icons';
import Image from 'next/image';
import { ReactElement } from 'react';

function Home() {
  return (
    <>
      <div className='hero min-h-screen bg-home-hero bg-fixed'>
        <div className='hero-overlay bg-opacity-50'></div>

        <div className='hero-content text-center text-neutral-content'>
          <div className='flex min-w-full flex-col items-center gap-5'>
            <Image
              width={450}
              height={250}
              src='/stea_logo_no_horse_border.svg'
              alt='STEA Logo'
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />

            <h2 className='text-2xl md:text-3xl lg:text-4xl'>
              Where Your Eventing Journey Begins
            </h2>

            <NextLink
              href={'/join'}
              prefetch={false}
            >
              <button className='btn-primary btn btn-lg text-xl md:btn-xl md:text-2xl'>
                Join Today!
              </button>
            </NextLink>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-5 p-5 md:gap-10 md:p-10'>
        <section className='mx-auto flex flex-col justify-around gap-5 md:flex-row md:flex-wrap'>
          <NavCard
            bodyText='Membership'
            href='/members-horses'
            img='/membership_landing.jpeg'
          />
          <NavCard
            bodyText='Shows'
            href='/calendar'
            img='/shows_landing.jpg'
          />
          <NavCard
            bodyText='Points'
            href='/scores'
            img='/points_landing.png'
          />
        </section>

        <div className='flex flex-col md:flex-row gap-5 md:gap-10'>
          <section className='card-compact container card mx-auto w-fit border shadow-xl md:shadow-2xl'>
            <div className='card-body'>
              <h2 className='text-center text-xl font-bold md:text-2xl lg:text-3xl'>
                Announcements
              </h2>

              <div className='divider mt-0 mb-0'></div>

              <div className='inline-grid place-content-center text-xl md:text-2xl text-center [&_h3]:mb-2'>
                <div>
                  <h3 className='text-lg md:text-xl lg:text-xl'>
                    2023 Stea Award Winners
                  </h3>
                  <a
                    className='btn btn-primary btn-sm md:btn-xs w-fit place-self-center'
                    href='/stea_2023_year_end_award_winners.docx'
                  >
                    Download
                  </a>
                </div>

                <div className='divider'></div>

                <div>
                  <h3 className='text-lg md:text-xl lg:text-xl'>
                    Keep up to date on STEA rules
                  </h3>
                  <a
                    className='btn-primary btn btn-sm md:btn-xs w-fit place-self-center gap-2'
                    href='/stea_rule_book.pdf'
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    {BookIcon}RuleBook
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className='card-compact container card mx-auto w-fit border shadow-xl md:shadow-2xl'>
            <div className='card-body'>
              <h2 className='text-center text-xl font-bold md:text-2xl lg:text-3xl'>
                Upcoming Events
              </h2>
              <div className='divider mt-0 mb-0'></div>
              <UpcomingEvents />
              <NextLink
                href='/calendar'
                className='self-center'
              >
                <button className='btn-primary btn-sm btn grid grid-flow-col place-content-center gap-2'>
                  {CalendarIcon} View Full Calendar
                </button>
              </NextLink>
            </div>
          </section>
        </div>

        <section className='card-compact container card mx-auto w-fit border shadow-xl md:shadow-2xl'>
          <div className='card-body'>
            <h2 className='text-center text-xl font-bold mg:text-2xl lg:text-3xl'>
              Recognized vendors
            </h2>
            <div className='divider mt-0 mb-0'></div>
            <div className='flex flex-row flex-wrap justify-center'>
              <Image
                src='/riding_warehouse.jpg'
                width={300}
                height={300}
                sizes='100vw, 50vw'
                alt='Logo for riding warehouse, two horses jumping towards a horseshoe.'
              />

              <Image
                src='/dover_home_page.jpg'
                width={300}
                height={300}
                sizes='100vw, 50vw'
                alt='Logo for dover tack, white logo "Dover Saddlery".'
              />

              <Image
                src='/sneak_away_home_page.png'
                width={300}
                height={300}
                sizes='100vw, 50vw'
                alt='Logo for riding warehouse, outline of horse head with "Sneak Away Riding Club".'
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default Home;
