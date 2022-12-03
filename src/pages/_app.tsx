import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';
import { useAtomsDevtools } from 'jotai/devtools';
import type { Session } from 'next-auth';

import { transformer } from '@/utils/trpc';
import '../styles/globals.css';

import type { AppRouter } from '@/backend/router/_app';
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
        <SessionProvider session={session}>
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

export default withTRPC<AppRouter>({
  config() {
    const QUART_DAY_SECONDS = 60 * 60 * 6;
    if (typeof window !== 'undefined') {
      // during client requests
      return {
        transformer, // optional - adds superjson serialization
        url: '/api/trpc',
        defaultOptions: {
          queries: {
            staleTime: QUART_DAY_SECONDS,
            refetchOnWindowFocus: false,
          },
        },
      };
    }

    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';

    return {
      transformer,
      url,
      // NOTE: Still unsure why this never works globally
      // Works just fine adding indivdually
      defaultOptions: {
        queries: {
          staleTime: QUART_DAY_SECONDS,
          refetchOnWindowFocus: false,
        },
      },
      links: [
        loggerLink({
          enabled: opts =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${url}/api/trpc`,
        }),
      ],
    };
  },
  ssr: false,
})(MyApp);
