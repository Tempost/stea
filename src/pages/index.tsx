import Link from 'next/link';

import { PublicLayout } from '@/components/layout';

import { ReactElement } from 'react';
import Image from 'next/image';

function Home() {
  return (
    <>
      <section>
        <div className='hero min-h-screen bg-home-hero bg-fixed'>
          <div className='hero-overlay bg-opacity-50'></div>

          <div className='hero-content text-neutral-content text-center'>
            <div className='flex flex-col items-center min-w-full'>
              <Image width={500} height={500} src='/stea_logo.svg'/>

              <h2 className='text-3xl prose-headings:h2'>
                Where your eventing journey begins
              </h2>
              <Link href={'/join'}>
                <button
                  data-cy='join-link-button'
                  className='btn btn-primary mt-20 text-xl w-[75%]'
                >
                  Join Today!
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className='flex flex-col items-center'>
        <h1 className='text-xl prose-headings:h1'> End of Year Placings</h1>
      </section>

      <section className='flex flex-col items-center'>
        <h1 className='text-xl prose-headings:h1'>Recognized vendors</h1>
      </section>
    </>
  );
}

Home.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default Home;
