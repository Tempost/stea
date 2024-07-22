import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BoardmemberUpdateInputSchema } from '../inputTypeSchemas/BoardmemberUpdateInputSchema'
import { BoardmemberUncheckedUpdateInputSchema } from '../inputTypeSchemas/BoardmemberUncheckedUpdateInputSchema'
import { BoardmemberWhereUniqueInputSchema } from '../inputTypeSchemas/BoardmemberWhereUniqueInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const BoardmemberSelectSchema: z.ZodType<Prisma.BoardmemberSelect> = z.object({
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  position: z.boolean().optional(),
}).strict()

export const BoardmemberUpdateArgsSchema: z.ZodType<Prisma.BoardmemberUpdateArgs> = z.object({
  select: BoardmemberSelectSchema.optional(),
  data: z.union([ BoardmemberUpdateInputSchema,BoardmemberUncheckedUpdateInputSchema ]),
  where: BoardmemberWhereUniqueInputSchema,
}).strict() ;

export default BoardmemberUpdateArgsSchema;
