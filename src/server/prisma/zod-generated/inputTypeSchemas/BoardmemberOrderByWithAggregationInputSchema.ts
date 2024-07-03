import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { BoardmemberCountOrderByAggregateInputSchema } from './BoardmemberCountOrderByAggregateInputSchema';
import { BoardmemberMaxOrderByAggregateInputSchema } from './BoardmemberMaxOrderByAggregateInputSchema';
import { BoardmemberMinOrderByAggregateInputSchema } from './BoardmemberMinOrderByAggregateInputSchema';

export const BoardmemberOrderByWithAggregationInputSchema: z.ZodType<Prisma.BoardmemberOrderByWithAggregationInput> = z.object({
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BoardmemberCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BoardmemberMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BoardmemberMinOrderByAggregateInputSchema).optional()
}).strict();

export default BoardmemberOrderByWithAggregationInputSchema;
