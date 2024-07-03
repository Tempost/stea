import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ShowWhereInputSchema } from './ShowWhereInputSchema';

export const ShowRelationFilterSchema: z.ZodType<Prisma.ShowRelationFilter> = z.object({
  is: z.lazy(() => ShowWhereInputSchema).optional(),
  isNot: z.lazy(() => ShowWhereInputSchema).optional()
}).strict();

export default ShowRelationFilterSchema;
