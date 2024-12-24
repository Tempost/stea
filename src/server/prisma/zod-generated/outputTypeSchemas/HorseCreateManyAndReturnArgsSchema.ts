import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { HorseCreateManyInputSchema } from '../inputTypeSchemas/HorseCreateManyInputSchema'

export const HorseCreateManyAndReturnArgsSchema: z.ZodType<Prisma.HorseCreateManyAndReturnArgs> = z.object({
  data: z.union([ HorseCreateManyInputSchema,HorseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default HorseCreateManyAndReturnArgsSchema;
