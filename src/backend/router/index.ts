import * as trpc from "@trpc/server";
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from "zod";
import { prisma } from "@/backend/prisma";
import { PrismaClient } from "@prisma/client";

type Context = {
  prisma: PrismaClient
}

const createRouter = () => {
  return trpc.router<Context>();
}

  export const appRouter = createRouter()
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
  });
  // .mutation("add-member");

  // const horse = createRouter()
  // .query("get-horses")
  // .mutation("add-horse");

  // const ranking = createRouter()
  // .query("get-rankings")
  // .mutation("update-ranking");

  // const family = createRouter()
  // .query("get-family")
  // .mutation("update-family");

  // const show = createRouter()
  // .query("get-show")
  // .mutation("add-show");

  // export const appRouter = createRouter()
  //   .merge('member.', member);
  // .merge('horse.', horse)
  // .merge('ranking.', ranking)
  // .merge('family.', family)
  // .merge('shows', show)

export type AppRouter = typeof appRouter;
