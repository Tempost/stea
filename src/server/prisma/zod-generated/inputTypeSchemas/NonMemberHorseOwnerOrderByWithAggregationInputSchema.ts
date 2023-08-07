import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { NonMemberHorseOwnerCountOrderByAggregateInputSchema } from './NonMemberHorseOwnerCountOrderByAggregateInputSchema';
import { NonMemberHorseOwnerMaxOrderByAggregateInputSchema } from './NonMemberHorseOwnerMaxOrderByAggregateInputSchema';
import { NonMemberHorseOwnerMinOrderByAggregateInputSchema } from './NonMemberHorseOwnerMinOrderByAggregateInputSchema';

export const NonMemberHorseOwnerOrderByWithAggregationInputSchema: z.ZodType<Prisma.NonMemberHorseOwnerOrderByWithAggregationInput> = z.object({
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  fullName: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  phoneType: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => NonMemberHorseOwnerCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NonMemberHorseOwnerMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NonMemberHorseOwnerMinOrderByAggregateInputSchema).optional()
}).strict();

export default NonMemberHorseOwnerOrderByWithAggregationInputSchema;
