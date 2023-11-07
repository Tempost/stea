import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { HorseCountOrderByAggregateInputSchema } from './HorseCountOrderByAggregateInputSchema';
import { HorseMaxOrderByAggregateInputSchema } from './HorseMaxOrderByAggregateInputSchema';
import { HorseMinOrderByAggregateInputSchema } from './HorseMinOrderByAggregateInputSchema';

export const HorseOrderByWithAggregationInputSchema: z.ZodType<Prisma.HorseOrderByWithAggregationInput> = z.object({
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  horseRN: z.lazy(() => SortOrderSchema).optional(),
  horseAKA: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  memberName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  registrationDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  regType: z.lazy(() => SortOrderSchema).optional(),
  owner: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  registrationEnd: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => HorseCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => HorseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => HorseMinOrderByAggregateInputSchema).optional()
}).strict();

export default HorseOrderByWithAggregationInputSchema;
