import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const HorseCountOrderByAggregateInputSchema: z.ZodType<Prisma.HorseCountOrderByAggregateInput> = z.object({
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  horseRN: z.lazy(() => SortOrderSchema).optional(),
  horseAKA: z.lazy(() => SortOrderSchema).optional(),
  memberName: z.lazy(() => SortOrderSchema).optional(),
  registrationDate: z.lazy(() => SortOrderSchema).optional(),
  regType: z.lazy(() => SortOrderSchema).optional(),
  owner: z.lazy(() => SortOrderSchema).optional(),
  registrationEnd: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default HorseCountOrderByAggregateInputSchema;
