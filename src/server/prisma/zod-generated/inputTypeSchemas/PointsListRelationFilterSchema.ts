import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PointsWhereInputSchema } from './PointsWhereInputSchema';

export const PointsListRelationFilterSchema: z.ZodType<Prisma.PointsListRelationFilter> = z.object({
  every: z.lazy(() => PointsWhereInputSchema).optional(),
  some: z.lazy(() => PointsWhereInputSchema).optional(),
  none: z.lazy(() => PointsWhereInputSchema).optional()
}).strict();

export default PointsListRelationFilterSchema;
