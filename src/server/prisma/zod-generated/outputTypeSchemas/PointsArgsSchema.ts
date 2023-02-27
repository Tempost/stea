import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { PointsSelectSchema } from '../inputTypeSchemas/PointsSelectSchema';
import { PointsIncludeSchema } from '../inputTypeSchemas/PointsIncludeSchema';

export const PointsArgsSchema: z.ZodType<Prisma.PointsArgs> = z.object({
  select: z.lazy(() => PointsSelectSchema).optional(),
  include: z.lazy(() => PointsIncludeSchema).optional(),
}).strict();

export default PointsArgsSchema;
