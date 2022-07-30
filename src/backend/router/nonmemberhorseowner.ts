import { z } from 'zod';
import _ from 'lodash';

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
      let data;

      if (_.isUndefined(input)) {
        data = await prisma.nonMemberHorseOwner
          .findMany()
          .then((owners) => owners)
          .catch((err) => console.log('Backend Error:', err));

        return data as NonMemberHorseOwner[];
      } else {
        data = await prisma.nonMemberHorseOwner
          .findFirst({
            where: {
              fullName: input.ownerName,
            },
          })
          .then((owners) => owners)
          .catch((err) => console.log('Backend Error:', err));

        return data as NonMemberHorseOwner;
      }
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

      const resOwner = await prisma.nonMemberHorseOwner
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
        .then((owners) => owners)
        .catch((err) => console.log('Backend Error:', err));

      if (input.combos) {
        for (let combo of input.combos) {
          const resCombo = await prisma.riderCombo
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
            .then((combos) => combos)
            .catch((err) => console.log('Backend Error:', err));

          console.log(resCombo);
        }
      }
    },
  });
