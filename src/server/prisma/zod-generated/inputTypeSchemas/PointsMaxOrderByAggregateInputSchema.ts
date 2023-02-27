import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const PointsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PointsMaxOrderByAggregateInput> = z.object({
  uid: z.lazy(() => SortOrderSchema).optional(),
  riderUid: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  place: z.lazy(() => SortOrderSchema).optional(),
  showUid: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export default PointsMaxOrderByAggregateInputSchema;
