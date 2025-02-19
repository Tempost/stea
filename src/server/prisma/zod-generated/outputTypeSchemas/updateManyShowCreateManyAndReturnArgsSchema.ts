import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ShowUpdateManyMutationInputSchema } from '../inputTypeSchemas/ShowUpdateManyMutationInputSchema'
import { ShowUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ShowUncheckedUpdateManyInputSchema'
import { ShowWhereInputSchema } from '../inputTypeSchemas/ShowWhereInputSchema'

export const updateManyShowCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManyShowCreateManyAndReturnArgs> = z.object({
  data: z.union([ ShowUpdateManyMutationInputSchema,ShowUncheckedUpdateManyInputSchema ]),
  where: ShowWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default updateManyShowCreateManyAndReturnArgsSchema;
