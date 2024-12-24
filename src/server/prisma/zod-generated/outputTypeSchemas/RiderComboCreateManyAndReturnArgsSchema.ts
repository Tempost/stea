import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RiderComboCreateManyInputSchema } from '../inputTypeSchemas/RiderComboCreateManyInputSchema'

export const RiderComboCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RiderComboCreateManyAndReturnArgs> = z.object({
  data: z.union([ RiderComboCreateManyInputSchema,RiderComboCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default RiderComboCreateManyAndReturnArgsSchema;
