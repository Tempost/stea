import { appRouter } from '@/backend/router/_app';
import { createContext } from '@/backend/prisma';
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
});
