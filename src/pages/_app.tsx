import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import { useAtomsDevtools } from 'jotai-devtools';
import type { Session } from 'next-auth';

import { trpc } from '@/utils/trpc';
import '../styles/globals.css';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface AppPropsWithLayout extends AppProps<{ session?: Session }> {
  Component: NextPageWithLayout;
}

// TODO TODO TODO: Remove this on prod build
const AtomsDevTools = ({ children }: any) => {
  useAtomsDevtools('Form State');
  return children;
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
              <Analytics />
            </>
          )}
        </SessionProvider>
      </AtomsDevTools>
    </>
  );
}

export default trpc.withTRPC(MyApp);
