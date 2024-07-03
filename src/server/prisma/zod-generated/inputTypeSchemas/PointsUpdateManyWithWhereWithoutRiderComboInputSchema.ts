import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PointsScalarWhereInputSchema } from './PointsScalarWhereInputSchema';
import { PointsUpdateManyMutationInputSchema } from './PointsUpdateManyMutationInputSchema';
import { PointsUncheckedUpdateManyWithoutRiderComboInputSchema } from './PointsUncheckedUpdateManyWithoutRiderComboInputSchema';

export const PointsUpdateManyWithWhereWithoutRiderComboInputSchema: z.ZodType<Prisma.PointsUpdateManyWithWhereWithoutRiderComboInput> = z.object({
  where: z.lazy(() => PointsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PointsUpdateManyMutationInputSchema),z.lazy(() => PointsUncheckedUpdateManyWithoutRiderComboInputSchema) ]),
}).strict();

export default PointsUpdateManyWithWhereWithoutRiderComboInputSchema;
