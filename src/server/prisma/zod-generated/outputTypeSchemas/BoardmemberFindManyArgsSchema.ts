import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BoardmemberWhereInputSchema } from '../inputTypeSchemas/BoardmemberWhereInputSchema'
import { BoardmemberOrderByWithRelationInputSchema } from '../inputTypeSchemas/BoardmemberOrderByWithRelationInputSchema'
import { BoardmemberWhereUniqueInputSchema } from '../inputTypeSchemas/BoardmemberWhereUniqueInputSchema'
import { BoardmemberScalarFieldEnumSchema } from '../inputTypeSchemas/BoardmemberScalarFieldEnumSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const BoardmemberSelectSchema: z.ZodType<Prisma.BoardmemberSelect> = z.object({
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  position: z.boolean().optional(),
}).strict()

export const BoardmemberFindManyArgsSchema: z.ZodType<Prisma.BoardmemberFindManyArgs> = z.object({
  select: BoardmemberSelectSchema.optional(),
  where: BoardmemberWhereInputSchema.optional(),
  orderBy: z.union([ BoardmemberOrderByWithRelationInputSchema.array(),BoardmemberOrderByWithRelationInputSchema ]).optional(),
  cursor: BoardmemberWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BoardmemberScalarFieldEnumSchema,BoardmemberScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default BoardmemberFindManyArgsSchema;
