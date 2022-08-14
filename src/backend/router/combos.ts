import { z } from 'zod';
import _ from 'lodash';

import { createRouter } from './utils';

import { prisma } from '@/backend/prisma';
import { CompleteRiderCombo } from '../prisma/zod';

export const riders = createRouter().query('get-riders', {
  async resolve() {
    const riders = await prisma.riderCombo
      .findMany({
        select: {
          memberName: true,
          horseName: true,
          shows: true,
          points: true,
        },
      })
      .catch(err => {
        console.log(err);
      });

    return riders as CompleteRiderCombo[];
  },
});
