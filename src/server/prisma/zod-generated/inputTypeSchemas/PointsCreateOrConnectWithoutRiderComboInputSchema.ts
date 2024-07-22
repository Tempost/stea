import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PointsWhereUniqueInputSchema } from './PointsWhereUniqueInputSchema';
import { PointsCreateWithoutRiderComboInputSchema } from './PointsCreateWithoutRiderComboInputSchema';
import { PointsUncheckedCreateWithoutRiderComboInputSchema } from './PointsUncheckedCreateWithoutRiderComboInputSchema';

export const PointsCreateOrConnectWithoutRiderComboInputSchema: z.ZodType<Prisma.PointsCreateOrConnectWithoutRiderComboInput> = z.object({
  where: z.lazy(() => PointsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PointsCreateWithoutRiderComboInputSchema),z.lazy(() => PointsUncheckedCreateWithoutRiderComboInputSchema) ]),
}).strict();

export default PointsCreateOrConnectWithoutRiderComboInputSchema;
