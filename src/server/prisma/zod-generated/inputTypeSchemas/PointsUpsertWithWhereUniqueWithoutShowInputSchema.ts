import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PointsWhereUniqueInputSchema } from './PointsWhereUniqueInputSchema';
import { PointsUpdateWithoutShowInputSchema } from './PointsUpdateWithoutShowInputSchema';
import { PointsUncheckedUpdateWithoutShowInputSchema } from './PointsUncheckedUpdateWithoutShowInputSchema';
import { PointsCreateWithoutShowInputSchema } from './PointsCreateWithoutShowInputSchema';
import { PointsUncheckedCreateWithoutShowInputSchema } from './PointsUncheckedCreateWithoutShowInputSchema';

export const PointsUpsertWithWhereUniqueWithoutShowInputSchema: z.ZodType<Prisma.PointsUpsertWithWhereUniqueWithoutShowInput> = z.object({
  where: z.lazy(() => PointsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PointsUpdateWithoutShowInputSchema),z.lazy(() => PointsUncheckedUpdateWithoutShowInputSchema) ]),
  create: z.union([ z.lazy(() => PointsCreateWithoutShowInputSchema),z.lazy(() => PointsUncheckedCreateWithoutShowInputSchema) ]),
}).strict();

export default PointsUpsertWithWhereUniqueWithoutShowInputSchema;
