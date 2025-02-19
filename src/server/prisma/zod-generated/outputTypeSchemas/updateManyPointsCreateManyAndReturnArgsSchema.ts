import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PointsUpdateManyMutationInputSchema } from '../inputTypeSchemas/PointsUpdateManyMutationInputSchema'
import { PointsUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/PointsUncheckedUpdateManyInputSchema'
import { PointsWhereInputSchema } from '../inputTypeSchemas/PointsWhereInputSchema'

export const updateManyPointsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManyPointsCreateManyAndReturnArgs> = z.object({
  data: z.union([ PointsUpdateManyMutationInputSchema,PointsUncheckedUpdateManyInputSchema ]),
  where: PointsWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default updateManyPointsCreateManyAndReturnArgsSchema;
