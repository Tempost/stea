import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PointsIncludeSchema } from '../inputTypeSchemas/PointsIncludeSchema'
import { PointsWhereInputSchema } from '../inputTypeSchemas/PointsWhereInputSchema'
import { PointsOrderByWithRelationInputSchema } from '../inputTypeSchemas/PointsOrderByWithRelationInputSchema'
import { PointsWhereUniqueInputSchema } from '../inputTypeSchemas/PointsWhereUniqueInputSchema'
import { PointsScalarFieldEnumSchema } from '../inputTypeSchemas/PointsScalarFieldEnumSchema'
import { RiderComboArgsSchema } from "../outputTypeSchemas/RiderComboArgsSchema"
import { ShowArgsSchema } from "../outputTypeSchemas/ShowArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PointsSelectSchema: z.ZodType<Prisma.PointsSelect> = z.object({
  uid: z.boolean().optional(),
  riderUid: z.boolean().optional(),
  points: z.boolean().optional(),
  place: z.boolean().optional(),
  showUid: z.boolean().optional(),
  RiderCombo: z.union([z.boolean(),z.lazy(() => RiderComboArgsSchema)]).optional(),
  show: z.union([z.boolean(),z.lazy(() => ShowArgsSchema)]).optional(),
}).strict()

export const PointsFindFirstArgsSchema: z.ZodType<Prisma.PointsFindFirstArgs> = z.object({
  select: PointsSelectSchema.optional(),
  include: PointsIncludeSchema.optional(),
  where: PointsWhereInputSchema.optional(),
  orderBy: z.union([ PointsOrderByWithRelationInputSchema.array(),PointsOrderByWithRelationInputSchema ]).optional(),
  cursor: PointsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PointsScalarFieldEnumSchema,PointsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default PointsFindFirstArgsSchema;
