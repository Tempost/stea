import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PointsScalarWhereInputSchema } from './PointsScalarWhereInputSchema';
import { PointsUpdateManyMutationInputSchema } from './PointsUpdateManyMutationInputSchema';
import { PointsUncheckedUpdateManyWithoutPointsInputSchema } from './PointsUncheckedUpdateManyWithoutPointsInputSchema';

export const PointsUpdateManyWithWhereWithoutShowInputSchema: z.ZodType<Prisma.PointsUpdateManyWithWhereWithoutShowInput> = z.object({
  where: z.lazy(() => PointsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PointsUpdateManyMutationInputSchema),z.lazy(() => PointsUncheckedUpdateManyWithoutPointsInputSchema) ]),
}).strict();

export default PointsUpdateManyWithWhereWithoutShowInputSchema;
