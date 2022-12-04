import { initTRPC, TRPCError } from '@trpc/server';
import { TrpcContext } from '@/server/context';
import { transformer } from '@/utils/trpc';

const t = initTRPC.context<TrpcContext>().create({
  transformer,
  isDev: process.env.NODE_ENV === 'development',
});

export const router = t.router;
export const procedure = t.procedure;
export const merge = t.mergeRouters;

export const isBoardMember = t.middleware(async ({ ctx, next }) => {
  if (!ctx.token) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      token: ctx.token,
      prisma: ctx.prisma,
    },
  });
});

export const dashboardProcedure = t.procedure.use(isBoardMember);
