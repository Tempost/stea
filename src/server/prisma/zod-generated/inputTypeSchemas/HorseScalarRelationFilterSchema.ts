import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { HorseWhereInputSchema } from './HorseWhereInputSchema';

export const HorseScalarRelationFilterSchema: z.ZodType<Prisma.HorseScalarRelationFilter> = z.object({
  is: z.lazy(() => HorseWhereInputSchema).optional(),
  isNot: z.lazy(() => HorseWhereInputSchema).optional()
}).strict();

export default HorseScalarRelationFilterSchema;
