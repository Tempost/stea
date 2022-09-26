import { appRouter } from '@/backend/router/_app';
import { createContext } from '@/backend/prisma';
import * as trpcNext from '@trpc/server/adapters/next';

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    console.error('Something went wrong', error);
  },
});
