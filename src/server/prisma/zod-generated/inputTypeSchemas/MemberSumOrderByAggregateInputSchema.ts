import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const MemberSumOrderByAggregateInputSchema: z.ZodType<Prisma.MemberSumOrderByAggregateInput> = z.object({
  zip: z.lazy(() => SortOrderSchema).optional(),
  useaMemberID: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export default MemberSumOrderByAggregateInputSchema;
