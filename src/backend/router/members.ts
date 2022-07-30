import { z } from 'zod';
import _ from 'lodash';

import { createRouter } from './utils';
import { prisma } from '@/backend/prisma';
import { HorseModel, PaymentModel, MemberModel } from '@/backend/prisma/zod';
import { Member } from '@prisma/client';

export const member = createRouter()
  .query('get-members', {
    input: z
      .object({
        memberName: z.string(),
      })
      .optional(),

    async resolve({ input }) {
      let data;

      if (_.isUndefined(input)) {
        data = await prisma.member
          .findMany()
          .then((members) => members)
          .catch((err) => console.log('Backend Error:', err));

        return data as Member[];
      } else {
        data = await prisma.member
          .findFirst({
            where: {
              fullName: input.memberName,
            },
          })
          .then((members) => members)
          .catch((err) => console.log('Backend Error:', err));

        return data as Member;
      }
    },
  })
  .query('eoy-placings', {
    async resolve() {
      // Need member, horse and placing info
      // Generate placing? or create new table with Placing Enums
      // and store placing in ranking table
    },
  })
  .mutation('add-member', {
    input: z.object({
      // NOTE: Will throw trpc client error if UID is not omited from the validator
      // when creating fresh members with payment info we do not need UID its auto generated
      member: MemberModel.required(),
      payment: PaymentModel.omit({ payee: true }).optional(),
      horses: HorseModel.array().optional(),
    }),

    async resolve({ input }) {
      console.log(input.member, input.payment);
      const member = await prisma.member
        .create({
          data: {
            ...input.member,
            payment: {
              create: {
                ...input.payment,
              },
            },
          },
        })
        .catch((err) => console.log('ERROR', err));

      if (!_.isUndefined(input.horses)) {
        for (let horse of input.horses) {
          const horseRes = await prisma.horse.create({
            data: {
              ...horse,
              memberName: input.member.fullName,
            },
          });
        }
      }
    },
  })
  .mutation('update-member', {
    input: z
      .object({
        fullName: z.string(),
      })
      .required(),
    async resolve() {},
  });
