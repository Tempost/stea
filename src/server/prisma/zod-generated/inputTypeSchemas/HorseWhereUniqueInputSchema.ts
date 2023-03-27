import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const HorseWhereUniqueInputSchema: z.ZodType<Prisma.HorseWhereUniqueInput> = z.object({
  horseRN: z.string().optional()
}).strict();

export default HorseWhereUniqueInputSchema;
