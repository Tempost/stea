import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const NonMemberHorseOwnerMinOrderByAggregateInputSchema: z.ZodType<Prisma.NonMemberHorseOwnerMinOrderByAggregateInput> = z.object({
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  fullName: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  phoneType: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default NonMemberHorseOwnerMinOrderByAggregateInputSchema;
