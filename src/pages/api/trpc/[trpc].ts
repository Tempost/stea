import { appRouter, AppRouter } from '@/backend/router';
import { createContext } from '@/backend/prisma';
import { inferProcedureOutput } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import _ from 'lodash';

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    if (_.isEqual(error.code, 'INTERNAL_SERVER_ERROR'))
      console.error('Something went wrong', error);
  },
  batching: {
    enabled: true
  }
});


export type inferQueryResponse<
  TRouteKey extends keyof AppRouter['_def']['queries']
  > = inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>;
