import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RiderComboWhereInputSchema } from '../inputTypeSchemas/RiderComboWhereInputSchema'

export const RiderComboDeleteManyArgsSchema: z.ZodType<Prisma.RiderComboDeleteManyArgs> = z.object({
  where: RiderComboWhereInputSchema.optional(),
}).strict() ;

export default RiderComboDeleteManyArgsSchema;
