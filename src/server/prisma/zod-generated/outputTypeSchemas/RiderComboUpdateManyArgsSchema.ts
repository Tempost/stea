import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { RiderComboUpdateManyMutationInputSchema } from '../inputTypeSchemas/RiderComboUpdateManyMutationInputSchema'
import { RiderComboUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/RiderComboUncheckedUpdateManyInputSchema'
import { RiderComboWhereInputSchema } from '../inputTypeSchemas/RiderComboWhereInputSchema'

export const RiderComboUpdateManyArgsSchema: z.ZodType<Prisma.RiderComboUpdateManyArgs> = z.object({
  data: z.union([ RiderComboUpdateManyMutationInputSchema,RiderComboUncheckedUpdateManyInputSchema ]),
  where: RiderComboWhereInputSchema.optional(),
}).strict()

export default RiderComboUpdateManyArgsSchema;
