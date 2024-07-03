import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BoardmemberCreateInputSchema } from '../inputTypeSchemas/BoardmemberCreateInputSchema'
import { BoardmemberUncheckedCreateInputSchema } from '../inputTypeSchemas/BoardmemberUncheckedCreateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const BoardmemberSelectSchema: z.ZodType<Prisma.BoardmemberSelect> = z.object({
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  position: z.boolean().optional(),
}).strict()

export const BoardmemberCreateArgsSchema: z.ZodType<Prisma.BoardmemberCreateArgs> = z.object({
  select: BoardmemberSelectSchema.optional(),
  data: z.union([ BoardmemberCreateInputSchema,BoardmemberUncheckedCreateInputSchema ]),
}).strict() ;

export default BoardmemberCreateArgsSchema;
