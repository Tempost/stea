import { z } from 'zod';
import { type Prisma } from '@prisma/client';

export const PointsWhereUniqueInputSchema: z.ZodType<Prisma.PointsWhereUniqueInput> = z.object({
  uid: z.string().optional(),
}).strict();

export default PointsWhereUniqueInputSchema;
