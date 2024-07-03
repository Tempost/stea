import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ShowWhereInputSchema } from './ShowWhereInputSchema';

export const ShowListRelationFilterSchema: z.ZodType<Prisma.ShowListRelationFilter> = z.object({
  every: z.lazy(() => ShowWhereInputSchema).optional(),
  some: z.lazy(() => ShowWhereInputSchema).optional(),
  none: z.lazy(() => ShowWhereInputSchema).optional()
}).strict();

export default ShowListRelationFilterSchema;
