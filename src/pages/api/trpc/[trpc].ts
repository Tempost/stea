import { createContext } from '@/server/context';
import { appRouter } from '@/server/router/_app';
import * as trpcNext from '@trpc/server/adapters/next';

const HOUR_SECONDS = 60 * 60;
const THIRTY_MINS = 60 * 30;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    console.error('Something went wrong', error);
  },
  responseMeta({ ctx, paths, type, errors }) {
    const allOk = errors.length === 0;
    const isQuery = type === 'query';

    if (ctx) {
      if (ctx?.res && allOk && isQuery) {
        return {
          headers: {
            'Cache-Control': `public, max-age=10, s-maxage=1, stale-while-revalidate`,
          },
        };
      }
    }

    return {};
  },
});
