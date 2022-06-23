import Head from 'next/head';
import { withTRPC } from "@trpc/next";
import { AppRouter } from "@/backend/router";

import type { NextComponentType } from 'next'
import type { AppProps } from 'next/app'

import '../styles/globals.css';
import Layout from '@/components/layout';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>STEA</title>
        <meta
          property='og:title'
          name="description"
          content="STEA dressage"
          charSet="UTF-8"
          lang="en"
        />
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}


export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
        * If you want to use SSR, you need to use the server's full URL
        * @link https://trpc.io/docs/ssr
        */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp as NextComponentType);
