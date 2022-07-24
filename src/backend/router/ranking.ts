import { createRouter } from './utils';

export const ranking = createRouter()
  .query('get-ranking', {
    async resolve() {},
  })
  .mutation('add-Ranking', {
    async resolve() {},
  });
