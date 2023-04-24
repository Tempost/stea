import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PointsCreateManyInputSchema } from '../inputTypeSchemas/PointsCreateManyInputSchema'

export const PointsCreateManyArgsSchema: z.ZodType<Prisma.PointsCreateManyArgs> = z.object({
  data: z.union([ PointsCreateManyInputSchema,PointsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default PointsCreateManyArgsSchema;
