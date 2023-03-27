import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PointsWhereInputSchema } from '../inputTypeSchemas/PointsWhereInputSchema'

export const PointsDeleteManyArgsSchema: z.ZodType<Prisma.PointsDeleteManyArgs> = z.object({
  where: PointsWhereInputSchema.optional(),
}).strict()

export default PointsDeleteManyArgsSchema;
