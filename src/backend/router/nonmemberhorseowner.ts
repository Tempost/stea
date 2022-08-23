import { z } from 'zod';

import { createRouter } from './utils';
import { prisma } from '@/backend/prisma';
import { NonMemberHorseOwner } from '@prisma/client';
import {
  HorseModel,
  NonMemberHorseOwnerModel,
  RiderComboModel,
} from '@/backend/prisma/zod';

export const nonMemberHorseOwner = createRouter()
  .query('get-owners', {
    input: z.object({ ownerName: z.string() }).optional(),

    async resolve({ input }) {
      const data = await prisma.nonMemberHorseOwner
        .findMany()
        .then(owners => owners)
        .catch(err => console.log('Backend Error:', err));

      return data as NonMemberHorseOwner[];
    },
  })
  .mutation('add-owner-horse', {
    input: z.object({
      owner: NonMemberHorseOwnerModel,
      horses: z.array(HorseModel),
      combos: z.array(RiderComboModel).optional(),
    }),
    async resolve({ input }) {
      console.log(input.owner, input.horses, input.combos);

      const addTo = await prisma.nonMemberHorseOwner.findUnique({
        where: { fullName: input.owner.fullName },
      });

      if (addTo === null) {
        console.log('null');
        await prisma.nonMemberHorseOwner
          .create({
            data: {
              ...input.owner,
              horses: {
                createMany: {
                  data: [...input.horses],
                },
              },
            },
          })
          .then(owners => owners)
          .catch(err => console.log('Backend Error:', err));
      } else {
        console.log('not null');
      }

      if (input.combos) {
        for (let combo of input.combos) {
          await prisma.riderCombo
            .create({
              data: {
                horse: {
                  connect: {
                    horseRN: combo.horseName,
                  },
                },
                member: {
                  connect: {
                    fullName: combo.memberName,
                  },
                },
              },
            })
            .then(combos => combos)
            .catch(err => console.log('Backend Error:', err));
        }
      }

    },
  });
