import NextLink from 'next/link';

import UpcomingEvents from '@/components/styled-ui/Events';
import NavCard from '@/components/styled-ui/NavCard';
import { BookIcon, CalendarIcon } from '@/components/icons';
import Image from 'next/image';
import Card from '@/components/card/Card';
import { Button } from '@/components/styled-ui/Button';

const Home = () => (
  <>
    <div className='hero bg-home-hero min-h-screen bg-fixed'>
      <div className='hero-overlay'></div>

      <div className='hero-content text-neutral-content text-center'>
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
        <Card
          size='sm'
          className='mx-auto shadow-xl md:shadow-2xl'
        >
          <Card.Body>
            <Card.Title
              tag='h2'
              className='place-content-center text-xl md:text-2xl lg:text-3xl'
            >
              Announcements
            </Card.Title>

            <div className='flex flex-col place-content-center text-center text-xl md:text-2xl [&_h3]:mb-2'>
              <div className='divider mt-0 mb-0'></div>
              <div>
                <h3 className='text-lg md:text-xl lg:text-xl'>
                  2024 STEA Final Year End Scores
                </h3>
                <a
                  href='/final_stea_points_2024.pdf'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <Button
                    variant='primary'
                    size='sm'
                    className='md:btn-xs'
                  >
                    Download
                  </Button>
                </a>
              </div>
              <div className='divider mt-0 mb-0'></div>
              <div>
                <h3 className='text-lg md:text-xl lg:text-xl'>
                  Keep up to date on STEA rules
                </h3>
                <a
                  href='/stea_rule_book_2025.docx'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <Button
                    variant='primary'
                    size='sm'
                    className='md:btn-xs'
                  >
                    {BookIcon}RuleBook
                  </Button>
                </a>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card
          size='sm'
          className='mx-auto shadow-xl md:shadow-2xl'
        >
          <Card.Body>
            <Card.Title
              tag='h2'
              className='place-content-center text-xl md:text-2xl lg:text-3xl'
            >
              Upcoming Events
            </Card.Title>
            <div className='divider mt-0 mb-0'></div>
            <UpcomingEvents />
            <Card.Actions className='self-center'>
              <NextLink href='/calendar'>
                <Button
                  variant='primary'
                  size='sm'
                >
                  {CalendarIcon} View Full Calendar
                </Button>
              </NextLink>
            </Card.Actions>
          </Card.Body>
        </Card>
      </div>

      <Card
        size='sm'
        className='mx-auto shadow-xl md:shadow-2xl'
      >
        <Card.Body>
          <Card.Title
            tag='h2'
            className='place-content-center text-xl md:text-2xl lg:text-3xl'
          >
            Recognized Vendors
          </Card.Title>
          <div className='divider mt-0 mb-0'></div>
          <div className='flex flex-row flex-wrap justify-center'>
            <Card.Image
              src='/riding_warehouse.jpg'
              width={300}
              height={300}
              sizes='100vw, 50vw'
              alt='Logo for riding warehouse, two horses cantering towards a horseshoe'
            />

            <Card.Image
              src='/dover_home_page.jpg'
              width={300}
              height={300}
              sizes='100vw, 50vw'
              alt='Logo for dover tack, white logo "Dover Saddlery"'
            />
          </div>
        </Card.Body>
      </Card>

      <Card
        size='sm'
        className='mx-auto shadow-xl md:shadow-2xl'
      >
        <Card.Body>
          <Card.Title
            tag='h2'
            className='place-content-center text-xl md:text-2xl lg:text-3xl'
          >
            Recognized Venues
          </Card.Title>
          <div className='divider mt-0 mb-0'></div>
          <div className='flex flex-row flex-wrap justify-center'>
            <Card.Image
              src='/texas_rose_horse_park.jpg'
              width={300}
              height={300}
              sizes='100vw, 50vw'
              alt='Logo for Texas Rose Horse Park, horse head with texas outline in the background'
            />
            <Card.Image
              src='/new_horizon_stables.png'
              width={300}
              height={300}
              sizes='100vw, 50vw'
              alt='Logo for New Horizon Stables, outline of rider jumping on horse'
            />
            <Card.Image
              src='/pinehill.jpg'
              width={300}
              height={300}
              sizes='100vw, 50vw'
              alt='Logo for pinehill. three riders two jumping, one doing dressage.'
            />
            <Card.Image
              src='/meadow_creek.jpg'
              width={300}
              height={300}
              sizes='100vw, 50vw'
              alt='Logo for Meadow Creek, horse jumping with text "Meadow Creek Equestrian Event Center"'
            />
          </div>
        </Card.Body>
      </Card>
      <Card
        size='sm'
        className='mx-auto shadow-xl md:shadow-2xl'
      >
        <Card.Body>
          <Card.Title
            tag='h2'
            className='place-content-center text-xl md:text-2xl lg:text-3xl'
          >
            Business Members
          </Card.Title>
          <div className='divider mt-0 mb-0'></div>
          <div className='flex flex-row flex-wrap justify-center'>
            <Card.Image
              src='/diamond_riding.png'
              width={300}
              height={300}
              sizes='100vw, 50vw'
              alt='Logo for diamond riding, diamond logo with horse shoe and horse head'
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  </>
);

export default Home;
