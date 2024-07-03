import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const RiderComboAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RiderComboAvgOrderByAggregateInput> = z.object({
  totalPoints: z.lazy(() => SortOrderSchema).optional(),
  totalShows: z.lazy(() => SortOrderSchema).optional(),
  showYear: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default RiderComboAvgOrderByAggregateInputSchema;
