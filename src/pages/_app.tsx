import { withTRPC } from "@trpc/next";
import { AppRouter } from "@/backend/router";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";

import type { NextComponentType } from 'next'
import type { AppProps } from 'next/app'

import '../styles/globals.css';
import theme from '@/theme';
import Layout from '@/components/layout';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider>
        <Layout>
        <Component {...pageProps} />
        </Layout>
      </ColorModeProvider>
    </ChakraProvider>
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
