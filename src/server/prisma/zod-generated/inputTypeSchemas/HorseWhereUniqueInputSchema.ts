import { z } from 'zod';
import { type Prisma } from '@prisma/client';

export const HorseWhereUniqueInputSchema: z.ZodType<Prisma.HorseWhereUniqueInput> = z.object({
  horseRN: z.string().optional(),
}).strict();

export default HorseWhereUniqueInputSchema;
