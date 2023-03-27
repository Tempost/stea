import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const PointsWhereUniqueInputSchema: z.ZodType<Prisma.PointsWhereUniqueInput> = z.object({
  uid: z.string().optional()
}).strict();

export default PointsWhereUniqueInputSchema;
