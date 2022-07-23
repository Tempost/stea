import Head from 'next/head';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';
import { AppRouter } from '@/backend/router';

import type { NextComponentType } from 'next';
import type { AppProps } from 'next/app';

import '../styles/globals.css';
import Layout from '@/components/layout';
import { transformer } from '@/utils/trpc';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>STEA</title>
        <meta
          property='og:title'
          name='description'
          content='STEA dressage'
          charSet='UTF-8'
          lang='en'
        />
        <meta
          name='viewport'
          content='viewport-fit=cover'
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    if (typeof window !== 'undefined') {
      // during client requests
      return {
        transformer, // optional - adds superjson serialization
        url: '/api/trpc',
      };
    }

    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const ONE_DAY_SECONDS = 60 * 60 * 24;
    ctx?.res?.setHeader(
      'Cache-Control',
      `s-maxage=1, stale-while-revalidate=${ONE_DAY_SECONDS}`
    );

    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';

    return {
      transformer,
      url,
      headers: {
        'x-ssr': '1',
      },
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      queryClientConfig: {
        defaultOptions: { queries: { staleTime: ONE_DAY_SECONDS } },
      },
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${url}/api/trpc`,
        }),
      ],
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp as NextComponentType);
