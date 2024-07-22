import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const HorseOrderByRelationAggregateInputSchema: z.ZodType<Prisma.HorseOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default HorseOrderByRelationAggregateInputSchema;
