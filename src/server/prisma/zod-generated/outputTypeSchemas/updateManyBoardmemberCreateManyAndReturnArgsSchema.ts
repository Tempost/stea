import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BoardmemberUpdateManyMutationInputSchema } from '../inputTypeSchemas/BoardmemberUpdateManyMutationInputSchema'
import { BoardmemberUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/BoardmemberUncheckedUpdateManyInputSchema'
import { BoardmemberWhereInputSchema } from '../inputTypeSchemas/BoardmemberWhereInputSchema'

export const updateManyBoardmemberCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManyBoardmemberCreateManyAndReturnArgs> = z.object({
  data: z.union([ BoardmemberUpdateManyMutationInputSchema,BoardmemberUncheckedUpdateManyInputSchema ]),
  where: BoardmemberWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default updateManyBoardmemberCreateManyAndReturnArgsSchema;
