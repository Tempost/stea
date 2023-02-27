import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { PointsWhereUniqueInputSchema } from './PointsWhereUniqueInputSchema';
import { PointsUpdateWithoutRiderComboInputSchema } from './PointsUpdateWithoutRiderComboInputSchema';
import { PointsUncheckedUpdateWithoutRiderComboInputSchema } from './PointsUncheckedUpdateWithoutRiderComboInputSchema';

export const PointsUpdateWithWhereUniqueWithoutRiderComboInputSchema: z.ZodType<Prisma.PointsUpdateWithWhereUniqueWithoutRiderComboInput> = z.object({
  where: z.lazy(() => PointsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PointsUpdateWithoutRiderComboInputSchema),z.lazy(() => PointsUncheckedUpdateWithoutRiderComboInputSchema) ]),
}).strict();

export default PointsUpdateWithWhereUniqueWithoutRiderComboInputSchema;
