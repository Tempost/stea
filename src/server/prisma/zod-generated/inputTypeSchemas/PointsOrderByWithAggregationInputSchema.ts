import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { PointsCountOrderByAggregateInputSchema } from './PointsCountOrderByAggregateInputSchema';
import { PointsAvgOrderByAggregateInputSchema } from './PointsAvgOrderByAggregateInputSchema';
import { PointsMaxOrderByAggregateInputSchema } from './PointsMaxOrderByAggregateInputSchema';
import { PointsMinOrderByAggregateInputSchema } from './PointsMinOrderByAggregateInputSchema';
import { PointsSumOrderByAggregateInputSchema } from './PointsSumOrderByAggregateInputSchema';

export const PointsOrderByWithAggregationInputSchema: z.ZodType<Prisma.PointsOrderByWithAggregationInput> = z.object({
  uid: z.lazy(() => SortOrderSchema).optional(),
  riderUid: z.lazy(() => SortOrderSchema).optional(),
  points: z.lazy(() => SortOrderSchema).optional(),
  place: z.lazy(() => SortOrderSchema).optional(),
  showUid: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PointsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PointsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PointsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PointsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PointsSumOrderByAggregateInputSchema).optional()
}).strict();

export default PointsOrderByWithAggregationInputSchema;
