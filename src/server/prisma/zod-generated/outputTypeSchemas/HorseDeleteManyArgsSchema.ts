import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { HorseWhereInputSchema } from '../inputTypeSchemas/HorseWhereInputSchema'

export const HorseDeleteManyArgsSchema: z.ZodType<Prisma.HorseDeleteManyArgs> = z.object({
  where: HorseWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default HorseDeleteManyArgsSchema;
