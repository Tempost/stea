import { z } from 'zod';

import { createRouter } from './utils';
import { prisma } from '@/backend/prisma';
import { FamilyMemberModel } from '@/backend/prisma/zod';

export const family = createRouter()
  .query('get-family', {
    input: z.object({
      name: z.string(),
    }),
    async resolve({ input }) {
      return await prisma.familyMember
        .findMany({
          where: {
            memberName: input.name,
          },
        })
        .then((record) => {
          return record;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  })
  .mutation('add-Family', {
    input: FamilyMemberModel.required(),
    async resolve({ input }) {
      await prisma.familyMember
        .create({
          data: input,
        })
        .catch((err) => console.log(err));
    },
  });
