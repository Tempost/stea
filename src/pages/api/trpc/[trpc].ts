import { createContext } from '@/backend/context';
import { appRouter } from '@/backend/router/_app';
import * as trpcNext from '@trpc/server/adapters/next';

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  batching: {
    enabled: true,
  },
  onError({ error }) {
    console.error('Something went wrong', error);
  },
  responseMeta({ ctx, paths, type, errors }) {
    const allOk = errors.length === 0;
    const isQuery = type === 'query';

    if (ctx?.res && allOk && isQuery) {
      const QUART_DAY_SECONDS = 60 * 60 * 6;
      return {
        headers: {
          'cache-control': `s-maxage=1, stale-while-revalidate=${QUART_DAY_SECONDS}`,
        },
      };
    }

    return {};
  },
});
