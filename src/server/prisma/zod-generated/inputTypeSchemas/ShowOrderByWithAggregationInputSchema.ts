import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { ShowCountOrderByAggregateInputSchema } from './ShowCountOrderByAggregateInputSchema';
import { ShowMaxOrderByAggregateInputSchema } from './ShowMaxOrderByAggregateInputSchema';
import { ShowMinOrderByAggregateInputSchema } from './ShowMinOrderByAggregateInputSchema';

export const ShowOrderByWithAggregationInputSchema: z.ZodType<Prisma.ShowOrderByWithAggregationInput> = z.object({
  uid: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  showName: z.lazy(() => SortOrderSchema).optional(),
  showType: z.lazy(() => SortOrderSchema).optional(),
  reviewed: z.lazy(() => SortOrderSchema).optional(),
  showDate: z.lazy(() => SortOrderSchema).optional(),
  showEndDate: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ShowCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ShowMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ShowMinOrderByAggregateInputSchema).optional()
}).strict();

export default ShowOrderByWithAggregationInputSchema;
