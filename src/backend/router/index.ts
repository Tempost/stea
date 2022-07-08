import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "@/backend/prisma";
import { PrismaClient } from "@prisma/client";
import { transformer } from '@/utils/trpc';

import {
  MemberModel,
  FamilyMemberModel,
  HorseModel,
  ShowModel,
  TotalRankingModel
} from "@/backend/prisma/zod";


type Context = {
  prisma: PrismaClient
}

const createRouter = () => {
  return trpc.router<Context>();
}

const member = createRouter()
  .query("get-members", {
    async resolve() {
      const members = await prisma.member.findMany()
        .then(members => {
          return members
        })
        .catch(err => {
          console.log(err);
        });
      return members;
    }
  })
  .mutation("add-member", {
    input: z
      .object({
        name: z.string(),
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
  .query("get-horses", {
    async resolve() {
      const horses = await prisma.horse.findMany()
        .then(horses => {
          return horses
        })
        .catch(err => {
          console.log(err);
        });
      return horses;
    }
  });
// .mutation("add-horse");

const ranking = createRouter()
  .query("get-ranking", {
    async resolve() {
      const ranking = await prisma.totalRanking.findMany()
        .then(ranking => {
          return ranking
        })
        .catch(err => {
          console.log(err);
        });
      return ranking;
    }
  });
// .mutation("update-ranking");

const family = createRouter()
  .query("get-family", {
    input: z
      .object({
        uid: z.number(),
      })
      .nullish(),

    async resolve({ input }) {
      const family = await prisma.familyMember.findMany({
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
      return family;
    }
  });
// .mutation("update-family");

const show = createRouter()
  .query("get-shows", {
    async resolve() {
      const shows = await prisma.show.findMany()
        .then(shows => {
          return shows
        })
        .catch(err => {
          console.log(err);
        });
      return shows;
    }
  });
// .mutation("add-show");

export const appRouter = createRouter().transformer(transformer)
  .merge('member.', member)
  .merge('horse.', horse)
  .merge('ranking.', ranking)
  .merge('family.', family)
  .merge('shows', show);

export type AppRouter = typeof appRouter;
