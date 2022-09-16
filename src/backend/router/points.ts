import { prisma } from '@/backend/prisma';
import { z } from 'zod';
import { createRouter } from './utils';

const requestForUpdate = z.object({
  fullName: z.string(),
  horseName: z.string(),
  showName: z.string(),

});

export const points = createRouter()
  .query('get-points', {
    async resolve() {
      return await prisma.totalPoints.findMany({
        include: {
          rider: {
            include: {
              horse: true,
              member: true,
            },
          },
        },
      });
    },
  })
  .mutation('update', {
    input: z.object({
      fullName: z.string(),
      horseName: z.string(),
      showName: z.string(),
    }),
    async resolve() {

    },
  });
