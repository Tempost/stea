import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma, Context } from '@/backend/prisma';
import { transformer } from '@/utils/trpc';

import {
  MemberModel,
  FamilyMemberModel,
  HorseModel,
  ShowModel,
  TotalRankingModel
} from '@/backend/prisma/zod';

import { Member } from '@prisma/client';


const createRouter = () => {
  return trpc.router<Context>();
}

const member = createRouter()
  .query('get-members', {
    async resolve() {
      const member = await prisma.member.findMany()
        .then(members => {
          return members
        })
        .catch(err => {
          console.log('Backend Error:', err);
        });
    return member as Member[]
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
    input: z
      .object({
        firstName: z.string(),
        lastName: z.string(),
        fullName: z.string(),
        memberType: z.string(),
        memberStatus: z.string(),
        address: z.string(),
        city: z.string(),
        state: z.string(),
        zip: z.number().max(6),
        phone: z.string(),
        previousMember: z.boolean(),
        riderLevel: z.string(),
        familyMembers: z.array(FamilyMemberModel).optional(),
        horses: z.array(HorseModel).optional(),
      })
      .required(),
    async resolve({ input }) {
      await prisma.member.create({
        data: input
      })
        .catch(err => console.log(err))
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
  });
// .mutation('add-horse');

const riderCombo = createRouter()
  .query('get-combos', {
    async resolve() {
      return await prisma.riderCombo.findMany()
        .then(combos => {
          return combos
        })
        .catch(err => {
          console.log(err);
        });
    }
  });

const ranking = createRouter()
  .query('get-ranking', {
    async resolve() {
      return await prisma.totalRanking.findMany()
        .then(ranking => {
          return ranking
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
// .mutation('update-ranking');

const family = createRouter()
  .query('get-family', {
    input: z
      .object({
        uid: z.string(),
      })
      .nullish(),

    async resolve({ input }) {
      return await prisma.familyMember.findMany({
        where: {
          memberId: {
            equals: input?.uid,
          },
        },
      })
        .then(record => {
          return record
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
// .mutation('update-family');

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
  });
// .mutation('add-show');

export const appRouter = createRouter().transformer(transformer)
  .merge('member.', member)
  .merge('horse.', horse)
  .merge('riderCombo.', riderCombo)
  .merge('ranking.', ranking)
  .merge('family.', family)
  .merge('shows.', show);

export type AppRouter = typeof appRouter;
