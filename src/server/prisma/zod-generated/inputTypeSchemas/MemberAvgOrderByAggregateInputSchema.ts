import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const MemberAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MemberAvgOrderByAggregateInput> = z.object({
  zip: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default MemberAvgOrderByAggregateInputSchema;
