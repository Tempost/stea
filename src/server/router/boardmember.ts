import { dashboardProcedure, procedure, router } from '@/server/trpc';
import { BoardmemberSchema } from '../prisma/zod-generated/modelSchema/BoardmemberSchema';
import { BoardmemberFindManyArgsSchema } from '../prisma/zod-generated/outputTypeSchemas/BoardmemberFindManyArgsSchema';

export const boardmember = router({
  all: procedure
    .input(BoardmemberFindManyArgsSchema.optional())
    .output(BoardmemberSchema.array())
    .query(
      async ({ input, ctx }) => await ctx.prisma.boardmember.findMany(input)
    ),

  update: dashboardProcedure
    .input(BoardmemberSchema)
    .output(BoardmemberSchema)
    .mutation(
      async ({ input: { position, ...rest }, ctx }) =>
        await ctx.prisma.boardmember.update({
          where: { position },
          data: { ...rest },
        })
    ),
});
