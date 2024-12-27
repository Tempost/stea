import { useAtomsDevtools } from 'jotai-devtools';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

import { trpc } from '@/utils/trpc';
import '../styles/globals.css';

import type { NextPage } from 'next';
import type { Session } from 'next-auth';
import type { AppProps } from 'next/app';
import type { PropsWithChildren, ReactElement, ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface AppPropsWithLayout extends AppProps<{ session?: Session }> {
  Component: NextPageWithLayout;
}

const AtomsDevTools = ({ children }: PropsWithChildren) => {
  useAtomsDevtools('Form State');
  return <>{children}</>;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || (page => page);
  return (
    <>
      <Head>
        <title>STEA</title>
        <meta
          property='og:title'
          name='description'
          content='STEA dressage'
          charSet='UTF-8'
        />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1'
        />
      </Head>
      <AtomsDevTools>
        <SessionProvider
          session={session}
          refetchInterval={60 * 60 * 60 * 24}
        >
          {getLayout(
            <>
              <Component {...pageProps} />
            </>,
          )}
        </SessionProvider>
      </AtomsDevTools>
    </>
  );
}

export default trpc.withTRPC(MyApp);
