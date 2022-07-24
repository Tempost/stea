import { z } from 'zod';
import _ from 'lodash';

import { createRouter } from './utils';
import { prisma } from '@/backend/prisma';
import { NonMemberHorseOwner } from '@prisma/client';

export const nonMemberHorseOwner = createRouter().query('get-owners', {
  input: z
    .object({
      ownerName: z.string(),
    })
    .optional(),

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
});
