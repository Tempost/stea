import { prisma } from '@/backend/prisma';
import { TotalPoints } from '@prisma/client';
import { createRouter } from './utils';

export const points = createRouter()
  .query('get-points', {
    async resolve() {
      const points = await prisma.totalPoints
        .findMany({
          include: {
            RiderCombo: {
              include: {
                horse: true,
                member: true
              }
            }
          }
        })
        .then(points => {
          return points;
        })
        .catch(err => {
          console.log(err);
        });
      
      return points as TotalPoints[];
    },
  })
  .mutation('update-rc-points', {
    async resolve() { },
  });
