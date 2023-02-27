import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { HorseWhereInputSchema } from './HorseWhereInputSchema';

export const HorseRelationFilterSchema: z.ZodType<Prisma.HorseRelationFilter> = z.object({
  is: z.lazy(() => HorseWhereInputSchema).optional(),
  isNot: z.lazy(() => HorseWhereInputSchema).optional(),
}).strict();

export default HorseRelationFilterSchema;
