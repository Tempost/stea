import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BoardmemberCreateManyInputSchema } from '../inputTypeSchemas/BoardmemberCreateManyInputSchema'

export const BoardmemberCreateManyArgsSchema: z.ZodType<Prisma.BoardmemberCreateManyArgs> = z.object({
  data: z.union([ BoardmemberCreateManyInputSchema,BoardmemberCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default BoardmemberCreateManyArgsSchema;
