import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma, Context } from '@/backend/prisma';
import { transformer } from '@/utils/trpc';

import {
  FamilyMemberModel,
  HorseModel,
  MemberModel,
  RiderComboModel,
  ShowModel,
  TotalRankingModel,
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
    input: MemberModel.required(),
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
  })
  .mutation('add-horse', {
    input: HorseModel.required(),
    async resolve({ input }) {
      await prisma.horse.create({
        data: input
      })
        .catch(err => console.log(err))
    }
  });

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
  })
  .mutation('add-Combo', {
    input: RiderComboModel.required(),
    async resolve({ input }) {
      await prisma.riderCombo.create({
        data: input
      })
        .catch(err => console.log(err))
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
  })
  .mutation('add-Ranking', {
    input: TotalRankingModel.required(),
    async resolve({ input }) {
      await prisma.totalRanking.create({
        data: input
      })
        .catch(err => console.log(err))
    }
  });

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
  .merge('riderCombo.', riderCombo)
  .merge('ranking.', ranking)
  .merge('family.', family)
  .merge('shows.', show);

export type AppRouter = typeof appRouter;
