import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const BoardmemberMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BoardmemberMaxOrderByAggregateInput> = z.object({
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default BoardmemberMaxOrderByAggregateInputSchema;
