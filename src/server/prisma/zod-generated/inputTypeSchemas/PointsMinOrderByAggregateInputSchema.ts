import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const PointsMinOrderByAggregateInputSchema: z.ZodType<Prisma.PointsMinOrderByAggregateInput> = z.object({
  uid: z.lazy(() => SortOrderSchema).optional(),
  riderUid: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  place: z.lazy(() => SortOrderSchema).optional(),
  showUid: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default PointsMinOrderByAggregateInputSchema;
