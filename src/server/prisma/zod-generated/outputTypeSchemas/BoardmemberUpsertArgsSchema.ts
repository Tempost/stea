import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BoardmemberWhereUniqueInputSchema } from '../inputTypeSchemas/BoardmemberWhereUniqueInputSchema'
import { BoardmemberCreateInputSchema } from '../inputTypeSchemas/BoardmemberCreateInputSchema'
import { BoardmemberUncheckedCreateInputSchema } from '../inputTypeSchemas/BoardmemberUncheckedCreateInputSchema'
import { BoardmemberUpdateInputSchema } from '../inputTypeSchemas/BoardmemberUpdateInputSchema'
import { BoardmemberUncheckedUpdateInputSchema } from '../inputTypeSchemas/BoardmemberUncheckedUpdateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const BoardmemberSelectSchema: z.ZodType<Prisma.BoardmemberSelect> = z.object({
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  position: z.boolean().optional(),
}).strict()

export const BoardmemberUpsertArgsSchema: z.ZodType<Prisma.BoardmemberUpsertArgs> = z.object({
  select: BoardmemberSelectSchema.optional(),
  where: BoardmemberWhereUniqueInputSchema,
  create: z.union([ BoardmemberCreateInputSchema,BoardmemberUncheckedCreateInputSchema ]),
  update: z.union([ BoardmemberUpdateInputSchema,BoardmemberUncheckedUpdateInputSchema ]),
}).strict() ;

export default BoardmemberUpsertArgsSchema;
