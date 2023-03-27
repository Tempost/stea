import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const RiderComboMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RiderComboMaxOrderByAggregateInput> = z.object({
  uid: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  division: z.lazy(() => SortOrderSchema).optional(),
  totalPoints: z.lazy(() => SortOrderSchema).optional(),
  totalShows: z.lazy(() => SortOrderSchema).optional(),
  completedHT: z.lazy(() => SortOrderSchema).optional(),
  multiVenue: z.lazy(() => SortOrderSchema).optional(),
  memberName: z.lazy(() => SortOrderSchema).optional(),
  horseName: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default RiderComboMaxOrderByAggregateInputSchema;
