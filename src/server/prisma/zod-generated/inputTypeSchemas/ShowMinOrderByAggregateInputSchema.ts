import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const ShowMinOrderByAggregateInputSchema: z.ZodType<Prisma.ShowMinOrderByAggregateInput> = z.object({
  uid: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  showName: z.lazy(() => SortOrderSchema).optional(),
  showType: z.lazy(() => SortOrderSchema).optional(),
  reviewed: z.lazy(() => SortOrderSchema).optional(),
  showDate: z.lazy(() => SortOrderSchema).optional(),
  showEndDate: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default ShowMinOrderByAggregateInputSchema;
