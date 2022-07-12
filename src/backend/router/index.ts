import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma, Context } from '@/backend/prisma';
import { transformer } from '@/utils/trpc';
import _ from 'lodash';

import {
  FamilyMemberModel,
  HorseModel,
  MemberModel,
  PaymentModel,
  ShowModel,
} from '@/backend/prisma/zod';

import { Member } from '@prisma/client';

const createRouter = () => {
  return trpc.router<Context>();
}

const member = createRouter()
  .query('get-members', {
    input: z.object({
      memberName: z.string()
    }).optional(),
    async resolve({ input }) {
      let data;

      if (_.isUndefined(input)) {
        data = await prisma.member.findMany()
          .then(members => members)
          .catch(err => console.log('Backend Error:', err));
        return data as Member[]

      } else {

        data = await prisma.member.findFirst({
          where: {
            fullName: input.memberName
          }
        })
          .then(members => members)
          .catch(err => console.log('Backend Error:', err));
        return data as Member;
      }
    }
  })
  .query('eoy-placings', {
    async resolve() {
      // Need member, horse and placing info
      // Generate placing? or create new table with Placing Enums
      // and store placing in ranking table
    }
  })
  .mutation('add-member', {
    input: z.object({
      // NOTE: Will throw trpc client error if UID is not omited from the validator
      // when creating fresh members with payment info we do not need UID its auto generated
      member: MemberModel.required(),
      payment: PaymentModel.required().omit({payee: true}),
      horse: HorseModel.optional(),
      family: FamilyMemberModel.optional(),
    }),
    async resolve({ input }) {
      console.log(input.member, input.payment);
      await prisma.member.create({
        data: {
          ...input.member,
          payment: {
            create: {
              ...input.payment,
            },
          }
        }
      })
        .catch(err => console.log('ERROR', err))
    }
  })
  .mutation('update-member', {
    input: z.object({
      fullName: z.string()
    }).required(),
    async resolve() {
    }
  });

const horse = createRouter()
  .query('get-horses', {
    async resolve() {
      return await prisma.horse.findMany()
        .then(horses => {
          return horses
        })
        .catch(err => {
          console.log(err);
        });
    }
  })
  .mutation('add-horse', {
    input: z.object({
      horse: HorseModel
        .required(),
        // .extend({
        //   riders: z.array(z.string()),
        // }),
    }),
    async resolve({ input }) {
      await prisma.horse.create({
        data: {
          ...input.horse,
        }
      })
        .catch(err => console.log(err))
    }
  });


const ranking = createRouter()
  .query('get-ranking', {
    async resolve() {
    }
  })
  .mutation('add-Ranking', {
    async resolve() {
    }
  });

const family = createRouter()
  .query('get-family', {
    input: z
      .object({
        name: z.string()
      }),
    async resolve({ input }) {
      return await prisma.familyMember.findMany({
        where: {
          memberName: input.name
        },
      })
        .then(record => {
          return record
        })
        .catch(err => {
          console.log(err);
        });
    }
  })
  .mutation('add-Family', {
    input: FamilyMemberModel.required(),
    async resolve({ input }) {
      await prisma.familyMember.create({
        data: input
      })
        .catch(err => console.log(err))
    }
  });

const show = createRouter()
  .query('get-shows', {
    async resolve() {
      return await prisma.show.findMany()
        .then(shows => {
          return shows
        })
        .catch(err => {
          console.log(err);
        });
    }
  })
  .mutation('add-Show', {
    input: ShowModel.required(),
    async resolve({ input }) {
      await prisma.show.create({
        data: input
      })
        .catch(err => console.log(err))
    }
  });

export const appRouter = createRouter().transformer(transformer)
  .merge('member.', member)
  .merge('horse.', horse)
  .merge('ranking.', ranking)
  .merge('family.', family)
  .merge('shows.', show);

export type AppRouter = typeof appRouter;
