import NextLink, { LinkProps } from 'next/link';

import { PublicLayout } from '@/components/layout';

import { ReactElement } from 'react';
import Image from 'next/image';
import { BookIcon, CalenderIcon } from '@/components/icons';

interface NavCardProps extends LinkProps {
  img: string; // TODO: Better type for this?
  bodyText: React.ReactNode;
}
function NavCard({ img, bodyText, ...props }: NavCardProps) {
  return (
    <NextLink {...props}>
      <div className='rounded-xl overflow-clip shadow-lg bg-cyan-500 hover:cursor-pointer w-[75%] h-full'>
        <div className='block w-full'>
          <Image width={400} height={400} layout='responsive' src={img} />
        </div>

        <div className='card-body text-center text-2xl font-bold'>
          <p>{bodyText}</p>
        </div>
      </div>
    </NextLink>
  );
}

function Home() {
  return (
    <div>
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

            <NextLink href={'/join'}>
              <button className='btn btn-primary btn-lg text-3xl'>
                Join Today!
              </button>
            </NextLink>
          </div>
        </div>
      </div>

      <div className='flex flex-col px-20'>
        <div className='grid lg:grid-flow-col justify-items-center sm:gap-10 md:gap-10 mt-10'>
          <NavCard
            bodyText='Membership'
            href='/join/benefits'
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

        <section className='card p-5 shadow-2xl w-fit mt-10 text-2xl self-center'>
          <h2 className='text-center text-red-600 font-bold'>Notice</h2>
          <div className='card-body'>
            <h3>Please remeber to check your points throught the year!</h3>
            <p className='inline-flex gap-2 self-center'>
              Review rule changes for 2023
              <button className='btn btn-primary btn-xs'>
                <span className='mr-1'>Rule Book </span> {BookIcon}
              </button>
            </p>
          </div>
        </section>

        <section className='flex flex-col gap-2 self-center items-center mt-10'>
          <h1 className='text-xl'>End of Year Placings</h1>
        </section>

        <section className='flex flex-col gap-2 self-center items-center mt-10'>
          <h2 className='text-xl'>Upcoming Events</h2>
          <NextLink href='/calender'>
            <button className='btn btn-primary btn-md grid place-content-center grid-flow-col gap-2'>
              {CalenderIcon} View Full Calender
            </button>
          </NextLink>

          {/* TODO: Grab shows happening in the next month and display here */}
          {/* TODO: Make some sort of event display component? */}
        </section>

        <section className='flex flex-col gap-2 items-center mt-10'>
          <h1 className='text-xl'>Recognized vendors</h1>
          {/* TODO: List of vendors w/ photos */}
        </section>
      </div>
    </div>
  );
}

Home.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default Home;
