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

    // TODO: Get by fullName
    async resolve({ input }) {
      const data = await prisma.nonMemberHorseOwner
        .findMany()
        .catch(err => console.log('Backend Error:', err));

      return data as NonMemberHorseOwner[];
    },
  })
  .mutation('add-owner-horse', {
    input: z.object({
      owner: NonMemberHorseOwnerModel,
      horses: z.array(HorseModel),
      combos: z.array(RiderComboModel.omit({ uid: true })).optional(),
    }),
    async resolve({ input }) {
      const existingMember = await prisma.member.findUnique({
        where: { fullName: input.owner.fullName },
      });

      if (existingMember !== null) {
        await prisma.member.update({
          where: { fullName: input.owner.fullName },
          data: {
            Horse: {
              createMany: {
                data: [...input.horses],
              },
            },
          },
        });
      }

      await prisma.nonMemberHorseOwner.upsert({
        where: { fullName: input.owner.fullName },
        create: {
          ...input.owner,
          horses: {
            createMany: {
              data: [...input.horses],
            },
          },
        },
        update: {
          horses: {
            createMany: {
              data: [...input.horses],
            },
          },
        }
      });

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
            .catch(err => console.log('Backend Error:', err));
        }
      }
    },
  });
