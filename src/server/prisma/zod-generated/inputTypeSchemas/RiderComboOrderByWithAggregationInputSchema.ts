import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { RiderComboCountOrderByAggregateInputSchema } from './RiderComboCountOrderByAggregateInputSchema';
import { RiderComboAvgOrderByAggregateInputSchema } from './RiderComboAvgOrderByAggregateInputSchema';
import { RiderComboMaxOrderByAggregateInputSchema } from './RiderComboMaxOrderByAggregateInputSchema';
import { RiderComboMinOrderByAggregateInputSchema } from './RiderComboMinOrderByAggregateInputSchema';
import { RiderComboSumOrderByAggregateInputSchema } from './RiderComboSumOrderByAggregateInputSchema';

export const RiderComboOrderByWithAggregationInputSchema: z.ZodType<Prisma.RiderComboOrderByWithAggregationInput> = z.object({
  uid: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  division: z.lazy(() => SortOrderSchema).optional(),
  totalPoints: z.lazy(() => SortOrderSchema).optional(),
  totalShows: z.lazy(() => SortOrderSchema).optional(),
  completedHT: z.lazy(() => SortOrderSchema).optional(),
  multiVenue: z.lazy(() => SortOrderSchema).optional(),
  memberName: z.lazy(() => SortOrderSchema).optional(),
  horseName: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RiderComboCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RiderComboAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RiderComboMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RiderComboMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RiderComboSumOrderByAggregateInputSchema).optional()
}).strict();

export default RiderComboOrderByWithAggregationInputSchema;
