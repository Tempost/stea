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
      <section>
        <h1>HTML Ipsum Presents</h1>

        <p>
          <strong>Pellentesque habitant morbi tristique</strong> senectus et
          netus et malesuada fames ac turpis egestas. Vestibulum tortor quam,
          feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero
          sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em>{' '}
          Mauris placerat eleifend leo. Quisque sit amet est et sapien
          ullamcorper pharetra. Vestibulum erat wisi, condimentum sed,{' '}
          <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum,
          elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis
          tempus lacus enim ac dui. <a href='#'>Donec non enim</a> in turpis
          pulvinar facilisis. Ut felis.
        </p>

        <h2>Header Level 2</h2>

        <ol>
          <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
          <li>Aliquam tincidunt mauris eu risus.</li>
        </ol>

        <blockquote>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            magna. Cras in mi at felis aliquet congue. Ut a est eget ligula
            molestie gravida. Curabitur massa. Donec eleifend, libero at
            sagittis mollis, tellus est malesuada tellus, at luctus turpis elit
            sit amet quam. Vivamus pretium ornare est.
          </p>
        </blockquote>

        <h3>Header Level 3</h3>

        <ul>
          <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
          <li>Aliquam tincidunt mauris eu risus.</li>
        </ul>
      </section>
      <section>
        <h1>HTML Ipsum Presents</h1>

        <p>
          <strong>Pellentesque habitant morbi tristique</strong> senectus et
          netus et malesuada fames ac turpis egestas. Vestibulum tortor quam,
          feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero
          sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em>{' '}
          Mauris placerat eleifend leo. Quisque sit amet est et sapien
          ullamcorper pharetra. Vestibulum erat wisi, condimentum sed,{' '}
          <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum,
          elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis
          tempus lacus enim ac dui. <a href='#'>Donec non enim</a> in turpis
          pulvinar facilisis. Ut felis.
        </p>

        <h2>Header Level 2</h2>

        <ol>
          <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
          <li>Aliquam tincidunt mauris eu risus.</li>
        </ol>

        <blockquote>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            magna. Cras in mi at felis aliquet congue. Ut a est eget ligula
            molestie gravida. Curabitur massa. Donec eleifend, libero at
            sagittis mollis, tellus est malesuada tellus, at luctus turpis elit
            sit amet quam. Vivamus pretium ornare est.
          </p>
        </blockquote>

        <h3>Header Level 3</h3>

        <ul>
          <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
          <li>Aliquam tincidunt mauris eu risus.</li>
        </ul>
      </section>
      <section>
        <h1>HTML Ipsum Presents</h1>

        <p>
          <strong>Pellentesque habitant morbi tristique</strong> senectus et
          netus et malesuada fames ac turpis egestas. Vestibulum tortor quam,
          feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero
          sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em>{' '}
          Mauris placerat eleifend leo. Quisque sit amet est et sapien
          ullamcorper pharetra. Vestibulum erat wisi, condimentum sed,{' '}
          <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum,
          elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis
          tempus lacus enim ac dui. <a href='#'>Donec non enim</a> in turpis
          pulvinar facilisis. Ut felis.
        </p>

        <h2>Header Level 2</h2>

        <ol>
          <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
          <li>Aliquam tincidunt mauris eu risus.</li>
        </ol>

        <blockquote>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            magna. Cras in mi at felis aliquet congue. Ut a est eget ligula
            molestie gravida. Curabitur massa. Donec eleifend, libero at
            sagittis mollis, tellus est malesuada tellus, at luctus turpis elit
            sit amet quam. Vivamus pretium ornare est.
          </p>
        </blockquote>

        <h3>Header Level 3</h3>

        <ul>
          <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
          <li>Aliquam tincidunt mauris eu risus.</li>
        </ul>
      </section>
      <section>
        <h1>HTML Ipsum Presents</h1>

        <p>
          <strong>Pellentesque habitant morbi tristique</strong> senectus et
          netus et malesuada fames ac turpis egestas. Vestibulum tortor quam,
          feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero
          sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em>{' '}
          Mauris placerat eleifend leo. Quisque sit amet est et sapien
          ullamcorper pharetra. Vestibulum erat wisi, condimentum sed,{' '}
          <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum,
          elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis
          tempus lacus enim ac dui. <a href='#'>Donec non enim</a> in turpis
          pulvinar facilisis. Ut felis.
        </p>

        <h2>Header Level 2</h2>

        <ol>
          <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
          <li>Aliquam tincidunt mauris eu risus.</li>
        </ol>

        <blockquote>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            magna. Cras in mi at felis aliquet congue. Ut a est eget ligula
            molestie gravida. Curabitur massa. Donec eleifend, libero at
            sagittis mollis, tellus est malesuada tellus, at luctus turpis elit
            sit amet quam. Vivamus pretium ornare est.
          </p>
        </blockquote>

        <h3>Header Level 3</h3>

        <ul>
          <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
          <li>Aliquam tincidunt mauris eu risus.</li>
        </ul>
      </section>
    </>
  );
}

Home.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default Home;
