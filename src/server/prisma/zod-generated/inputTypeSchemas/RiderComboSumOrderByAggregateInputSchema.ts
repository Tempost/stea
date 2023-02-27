import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const RiderComboSumOrderByAggregateInputSchema: z.ZodType<Prisma.RiderComboSumOrderByAggregateInput> = z.object({
  totalPoints: z.lazy(() => SortOrderSchema).optional(),
  totalShows: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export default RiderComboSumOrderByAggregateInputSchema;
