import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RiderComboUpdateManyMutationInputSchema } from '../inputTypeSchemas/RiderComboUpdateManyMutationInputSchema'
import { RiderComboUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/RiderComboUncheckedUpdateManyInputSchema'
import { RiderComboWhereInputSchema } from '../inputTypeSchemas/RiderComboWhereInputSchema'

export const updateManyRiderComboCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManyRiderComboCreateManyAndReturnArgs> = z.object({
  data: z.union([ RiderComboUpdateManyMutationInputSchema,RiderComboUncheckedUpdateManyInputSchema ]),
  where: RiderComboWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default updateManyRiderComboCreateManyAndReturnArgsSchema;
