import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BoardmemberWhereUniqueInputSchema } from '../inputTypeSchemas/BoardmemberWhereUniqueInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const BoardmemberSelectSchema: z.ZodType<Prisma.BoardmemberSelect> = z.object({
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  position: z.boolean().optional(),
}).strict()

export const BoardmemberFindUniqueArgsSchema: z.ZodType<Prisma.BoardmemberFindUniqueArgs> = z.object({
  select: BoardmemberSelectSchema.optional(),
  where: BoardmemberWhereUniqueInputSchema,
}).strict() ;

export default BoardmemberFindUniqueArgsSchema;
