import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ShowIncludeSchema } from '../inputTypeSchemas/ShowIncludeSchema'
import { ShowWhereUniqueInputSchema } from '../inputTypeSchemas/ShowWhereUniqueInputSchema'
import { RiderComboFindManyArgsSchema } from "../outputTypeSchemas/RiderComboFindManyArgsSchema"
import { PointsFindManyArgsSchema } from "../outputTypeSchemas/PointsFindManyArgsSchema"
import { ShowCountOutputTypeArgsSchema } from "../outputTypeSchemas/ShowCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ShowSelectSchema: z.ZodType<Prisma.ShowSelect> = z.object({
  uid: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  showName: z.boolean().optional(),
  showType: z.boolean().optional(),
  reviewed: z.boolean().optional(),
  showDate: z.boolean().optional(),
  showEndDate: z.boolean().optional(),
  url: z.boolean().optional(),
  riders: z.union([z.boolean(),z.lazy(() => RiderComboFindManyArgsSchema)]).optional(),
  points: z.union([z.boolean(),z.lazy(() => PointsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ShowCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ShowDeleteArgsSchema: z.ZodType<Prisma.ShowDeleteArgs> = z.object({
  select: ShowSelectSchema.optional(),
  include: ShowIncludeSchema.optional(),
  where: ShowWhereUniqueInputSchema,
}).strict()

export default ShowDeleteArgsSchema;
