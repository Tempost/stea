import superjson from 'superjson';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { inferRouterInputs, inferRouterOutputs, inferRouterDef } from '@trpc/server';

import { AppRouter } from '@/server/router/_app';

export const transformer = superjson;
export const trpc = createTRPCNext<AppRouter>({
  config() {
    const QUART_DAY_SECONDS = 60 * 60 * 6;

    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

    return {
      transformer,
      url,
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
});

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
export type RouterSomething = inferRouterDef<AppRouter>;

export type AppQueries = AppRouter['_def']['procedures'];

// Name the different routers available
export type TRouters = keyof AppQueries;

export type FormMutation = AppQueries['members']['add'];

// export type TQuery = keyof AppQueries;
// export type inferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
//   AppQueries[TRouteKey]
// >;

// export type inferQueryInput<TRouteKey extends TQuery> = inferProcedureInput<
//   AppQueries[TRouteKey]
// >;

// export type AppMutations = AppRouter['_def']['mutations'];
// export type TMutation = keyof AppMutations;

// export type inferMutationOutput<TRouteKey extends TMutation> =
//   inferProcedureOutput<AppMutations[TRouteKey]>;

// export type inferMutationInput<TRouteKey extends TMutation> =
//   inferProcedureInput<AppMutations[TRouteKey]>;
