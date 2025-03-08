import NextLink from 'next/link';

import UpcomingEvents from '@/components/home/Events';
import NavCard from '@/components/home/NavCard';
import { BookIcon, CalendarIcon } from '@/components/icons';
import Image from 'next/image';

const Home = () => (
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
            <button className='md:btn-xl btn btn-primary btn-lg text-xl md:text-2xl'>
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
          href='/calendar'
          img='/home_show_card.jpg'
        />
        <NavCard
          bodyText='Points'
          href='/scores'
          img='/points_landing.png'
        />
      </div>

      <div className='flex flex-col gap-5 md:flex-row md:gap-10'>
        <div className='container card card-compact mx-auto w-fit border shadow-xl md:shadow-2xl'>
          <div className='card-body'>
            <h2 className='text-center text-xl font-bold md:text-2xl lg:text-3xl'>
              Announcements
            </h2>

            <div className='divider mb-0 mt-0'></div>

            <div className='inline-grid place-content-center text-center text-xl md:text-2xl [&_h3]:mb-2'>
              <div>
                <h3 className='text-lg md:text-xl lg:text-xl'>
                  2024 STEA Final Year End Scores
                </h3>
                <a
                  className='btn btn-primary btn-sm w-fit place-self-center md:btn-xs'
                  href='/final_stea_points_2024.pdf'
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
                  className='btn btn-primary btn-sm w-fit gap-2 place-self-center md:btn-xs'
                  href='/stea_rule_book_2025.docx'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  {BookIcon}RuleBook
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='container card card-compact mx-auto w-fit border shadow-xl md:shadow-2xl'>
          <div className='card-body'>
            <h2 className='text-center text-xl font-bold md:text-2xl lg:text-3xl'>
              Upcoming Events
            </h2>
            <div className='divider mb-0 mt-0'></div>
            <UpcomingEvents />
            <NextLink
              href='/calendar'
              className='self-center'
            >
              <button className='btn btn-primary btn-sm grid grid-flow-col place-content-center gap-2'>
                {CalendarIcon} View Full Calendar
              </button>
            </NextLink>
          </div>
        </div>
      </div>

      <div className='container card card-compact mx-auto w-fit border shadow-xl md:shadow-2xl'>
        <div className='card-body'>
          <h2 className='mg:text-2xl text-center text-xl font-bold lg:text-3xl'>
            Recognized Vendors
          </h2>
          <div className='divider mb-0 mt-0'></div>
          <div className='flex flex-row flex-wrap justify-center'>
            <Image
              src='/riding_warehouse.jpg'
              width={300}
              height={300}
              sizes='100vw, 50vw'
              alt='Logo for riding warehouse, two horses cantering towards a horseshoe'
            />

            <Image
              src='/dover_home_page.jpg'
              width={300}
              height={300}
              sizes='100vw, 50vw'
              alt='Logo for dover tack, white logo "Dover Saddlery"'
            />
          </div>
        </div>
      </div>
      <div className='container card card-compact mx-auto w-fit border shadow-xl md:shadow-2xl'>
        <div className='card-body'>
          <h2 className='mg:text-2xl text-center text-xl font-bold lg:text-3xl'>
            Recognized Venues
          </h2>
          <div className='divider mb-0 mt-0'></div>
          <div className='flex flex-row flex-wrap justify-center'>
            <Image
              src='/texas_rose_horse_park.jpg'
              width={300}
              height={300}
              sizes='100vw, 50vw'
              alt='Logo for Texas Rose Horse Park, horse head with texas outline in the background'
            />
            <Image
              src='/new_horizon_stables.png'
              width={300}
              height={300}
              sizes='100vw, 50vw'
              alt='Logo for New Horizon Stables, outline of rider jumping on horse'
            />
            <Image
              src='/pinehill.jpg'
              width={300}
              height={300}
              sizes='100vw, 50vw'
              alt='Logo for pinehill. three riders two jumping, one doing dressage.'
            />
            <Image
              src='/meadow_creek.jpg'
              width={300}
              height={300}
              sizes='100vw, 50vw'
              alt='Logo for Meadow Creek, horse jumping with text "Meadow Creek Equestrian Event Center"'
            />
          </div>
        </div>
      </div>
      <div className='container card card-compact mx-auto w-fit border shadow-xl md:shadow-2xl'>
        <div className='card-body'>
          <h2 className='mg:text-2xl text-center text-xl font-bold lg:text-3xl'>
            Business Members
          </h2>
          <div className='divider mb-0 mt-0'></div>
          <div className='flex flex-row flex-wrap justify-center'>
            <Image
              src='/diamond_riding.png'
              width={300}
              height={300}
              sizes='100vw, 50vw'
              alt='Logo for diamond riding, diamond logo with horse shoe and horse head'
            />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Home;
