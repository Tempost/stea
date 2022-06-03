import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "@/backend/utils/prisma";

const createRouter = () => {
  return trpc.router<Context>();
}


  const member = createRouter()
  .query("get-members")
  .mutation("add-member");

  const horse = createRouter()
  .query("get-horses")
  .mutation("add-horse");

  const ranking = createRouter()
  .query("get-rankings")
  .mutation("update-ranking");

  const family = createRouter()
  .query("get-family")
  .mutation("update-family");

  const show = createRouter()
  .query("get-show")
  .mutation("add-show");

export const appRouter = createRouter()
  .merge('member.', member)
  .merge('horse.', horse)
  .merge('ranking.', ranking)
  .merge('family.', family)
  .merge('shows', show)
export type AppRouter = typeof appRouter;
