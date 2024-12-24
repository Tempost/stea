import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BoardmemberCreateManyInputSchema } from '../inputTypeSchemas/BoardmemberCreateManyInputSchema'

export const BoardmemberCreateManyAndReturnArgsSchema: z.ZodType<Prisma.BoardmemberCreateManyAndReturnArgs> = z.object({
  data: z.union([ BoardmemberCreateManyInputSchema,BoardmemberCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default BoardmemberCreateManyAndReturnArgsSchema;
