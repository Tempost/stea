import superjson from 'superjson';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type {
  inferRouterInputs,
  inferRouterOutputs,
  inferRouterDef,
} from '@trpc/server';
import { AppRouter } from '@/server/router/_app';

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const transformer = superjson;
export const trpc = createTRPCNext<AppRouter>({
  config() {

    return {
      transformer,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
            refetchOnWindowFocus: false,
          },
        },
      },
      links: [
        loggerLink({
          enabled: opts =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },
  ssr: false,
});

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
export type RouterSomething = inferRouterDef<AppRouter>;

export type AppQueries = AppRouter['_def']['procedures'];

// Name the different routers available
export type TRouters = keyof AppQueries;

export type MemberAddMutation = AppQueries['members']['add'];
