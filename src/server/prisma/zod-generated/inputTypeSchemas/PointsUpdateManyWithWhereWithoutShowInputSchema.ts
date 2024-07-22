import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PointsScalarWhereInputSchema } from './PointsScalarWhereInputSchema';
import { PointsUpdateManyMutationInputSchema } from './PointsUpdateManyMutationInputSchema';
import { PointsUncheckedUpdateManyWithoutShowInputSchema } from './PointsUncheckedUpdateManyWithoutShowInputSchema';

export const PointsUpdateManyWithWhereWithoutShowInputSchema: z.ZodType<Prisma.PointsUpdateManyWithWhereWithoutShowInput> = z.object({
  where: z.lazy(() => PointsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PointsUpdateManyMutationInputSchema),z.lazy(() => PointsUncheckedUpdateManyWithoutShowInputSchema) ]),
}).strict();

export default PointsUpdateManyWithWhereWithoutShowInputSchema;
