import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const PointsSumOrderByAggregateInputSchema: z.ZodType<Prisma.PointsSumOrderByAggregateInput> = z.object({
  points: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default PointsSumOrderByAggregateInputSchema;
