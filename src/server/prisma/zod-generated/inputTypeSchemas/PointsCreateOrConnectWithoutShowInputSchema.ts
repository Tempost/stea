import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PointsWhereUniqueInputSchema } from './PointsWhereUniqueInputSchema';
import { PointsCreateWithoutShowInputSchema } from './PointsCreateWithoutShowInputSchema';
import { PointsUncheckedCreateWithoutShowInputSchema } from './PointsUncheckedCreateWithoutShowInputSchema';

export const PointsCreateOrConnectWithoutShowInputSchema: z.ZodType<Prisma.PointsCreateOrConnectWithoutShowInput> = z.object({
  where: z.lazy(() => PointsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PointsCreateWithoutShowInputSchema),z.lazy(() => PointsUncheckedCreateWithoutShowInputSchema) ]),
}).strict();

export default PointsCreateOrConnectWithoutShowInputSchema;
