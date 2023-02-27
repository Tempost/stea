import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { PointsWhereUniqueInputSchema } from './PointsWhereUniqueInputSchema';
import { PointsUpdateWithoutShowInputSchema } from './PointsUpdateWithoutShowInputSchema';
import { PointsUncheckedUpdateWithoutShowInputSchema } from './PointsUncheckedUpdateWithoutShowInputSchema';

export const PointsUpdateWithWhereUniqueWithoutShowInputSchema: z.ZodType<Prisma.PointsUpdateWithWhereUniqueWithoutShowInput> = z.object({
  where: z.lazy(() => PointsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PointsUpdateWithoutShowInputSchema),z.lazy(() => PointsUncheckedUpdateWithoutShowInputSchema) ]),
}).strict();

export default PointsUpdateWithWhereUniqueWithoutShowInputSchema;
