import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { PointsWhereUniqueInputSchema } from './PointsWhereUniqueInputSchema';
import { PointsUpdateWithoutRiderComboInputSchema } from './PointsUpdateWithoutRiderComboInputSchema';
import { PointsUncheckedUpdateWithoutRiderComboInputSchema } from './PointsUncheckedUpdateWithoutRiderComboInputSchema';
import { PointsCreateWithoutRiderComboInputSchema } from './PointsCreateWithoutRiderComboInputSchema';
import { PointsUncheckedCreateWithoutRiderComboInputSchema } from './PointsUncheckedCreateWithoutRiderComboInputSchema';

export const PointsUpsertWithWhereUniqueWithoutRiderComboInputSchema: z.ZodType<Prisma.PointsUpsertWithWhereUniqueWithoutRiderComboInput> = z.object({
  where: z.lazy(() => PointsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PointsUpdateWithoutRiderComboInputSchema),z.lazy(() => PointsUncheckedUpdateWithoutRiderComboInputSchema) ]),
  create: z.union([ z.lazy(() => PointsCreateWithoutRiderComboInputSchema),z.lazy(() => PointsUncheckedCreateWithoutRiderComboInputSchema) ]),
}).strict();

export default PointsUpsertWithWhereUniqueWithoutRiderComboInputSchema;
