import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BoardmemberWhereInputSchema } from '../inputTypeSchemas/BoardmemberWhereInputSchema'

export const BoardmemberDeleteManyArgsSchema: z.ZodType<Prisma.BoardmemberDeleteManyArgs> = z.object({
  where: BoardmemberWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default BoardmemberDeleteManyArgsSchema;
