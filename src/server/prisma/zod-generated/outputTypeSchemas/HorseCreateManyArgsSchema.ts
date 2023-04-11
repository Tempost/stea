import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { HorseCreateManyInputSchema } from '../inputTypeSchemas/HorseCreateManyInputSchema'

export const HorseCreateManyArgsSchema: z.ZodType<Prisma.HorseCreateManyArgs> = z.object({
  data: HorseCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default HorseCreateManyArgsSchema;
