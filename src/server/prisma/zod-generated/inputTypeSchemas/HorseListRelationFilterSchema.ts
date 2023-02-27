import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { HorseWhereInputSchema } from './HorseWhereInputSchema';

export const HorseListRelationFilterSchema: z.ZodType<Prisma.HorseListRelationFilter> = z.object({
  every: z.lazy(() => HorseWhereInputSchema).optional(),
  some: z.lazy(() => HorseWhereInputSchema).optional(),
  none: z.lazy(() => HorseWhereInputSchema).optional(),
}).strict();

export default HorseListRelationFilterSchema;
