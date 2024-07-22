import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PointsUpdateManyMutationInputSchema } from '../inputTypeSchemas/PointsUpdateManyMutationInputSchema'
import { PointsUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/PointsUncheckedUpdateManyInputSchema'
import { PointsWhereInputSchema } from '../inputTypeSchemas/PointsWhereInputSchema'

export const PointsUpdateManyArgsSchema: z.ZodType<Prisma.PointsUpdateManyArgs> = z.object({
  data: z.union([ PointsUpdateManyMutationInputSchema,PointsUncheckedUpdateManyInputSchema ]),
  where: PointsWhereInputSchema.optional(),
}).strict() ;

export default PointsUpdateManyArgsSchema;
