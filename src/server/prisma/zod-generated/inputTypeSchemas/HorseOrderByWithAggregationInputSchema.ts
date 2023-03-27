import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { HorseCountOrderByAggregateInputSchema } from './HorseCountOrderByAggregateInputSchema';
import { HorseMaxOrderByAggregateInputSchema } from './HorseMaxOrderByAggregateInputSchema';
import { HorseMinOrderByAggregateInputSchema } from './HorseMinOrderByAggregateInputSchema';

export const HorseOrderByWithAggregationInputSchema: z.ZodType<Prisma.HorseOrderByWithAggregationInput> = z.object({
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  horseRN: z.lazy(() => SortOrderSchema).optional(),
  horseAKA: z.lazy(() => SortOrderSchema).optional(),
  memberName: z.lazy(() => SortOrderSchema).optional(),
  registrationDate: z.lazy(() => SortOrderSchema).optional(),
  regType: z.lazy(() => SortOrderSchema).optional(),
  owner: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => HorseCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => HorseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => HorseMinOrderByAggregateInputSchema).optional()
}).strict();

export default HorseOrderByWithAggregationInputSchema;
