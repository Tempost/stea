import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BoardmemberUpdateManyMutationInputSchema } from '../inputTypeSchemas/BoardmemberUpdateManyMutationInputSchema'
import { BoardmemberUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/BoardmemberUncheckedUpdateManyInputSchema'
import { BoardmemberWhereInputSchema } from '../inputTypeSchemas/BoardmemberWhereInputSchema'

export const BoardmemberUpdateManyArgsSchema: z.ZodType<Prisma.BoardmemberUpdateManyArgs> = z.object({
  data: z.union([ BoardmemberUpdateManyMutationInputSchema,BoardmemberUncheckedUpdateManyInputSchema ]),
  where: BoardmemberWhereInputSchema.optional(),
}).strict() ;

export default BoardmemberUpdateManyArgsSchema;
