import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';

export const BoardmemberOrderByWithRelationInputSchema: z.ZodType<Prisma.BoardmemberOrderByWithRelationInput> = z.object({
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  position: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default BoardmemberOrderByWithRelationInputSchema;
