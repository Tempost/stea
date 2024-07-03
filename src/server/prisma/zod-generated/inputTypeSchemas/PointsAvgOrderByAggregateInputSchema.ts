import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const PointsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PointsAvgOrderByAggregateInput> = z.object({
  points: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default PointsAvgOrderByAggregateInputSchema;
