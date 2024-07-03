import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { HorseOrderByRelationAggregateInputSchema } from './HorseOrderByRelationAggregateInputSchema';

export const NonMemberHorseOwnerOrderByWithRelationInputSchema: z.ZodType<Prisma.NonMemberHorseOwnerOrderByWithRelationInput> = z.object({
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  fullName: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  phoneType: z.lazy(() => SortOrderSchema).optional(),
  horses: z.lazy(() => HorseOrderByRelationAggregateInputSchema).optional()
}).strict();

export default NonMemberHorseOwnerOrderByWithRelationInputSchema;
