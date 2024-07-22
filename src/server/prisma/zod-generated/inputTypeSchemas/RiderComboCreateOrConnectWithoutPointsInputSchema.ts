import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RiderComboWhereUniqueInputSchema } from './RiderComboWhereUniqueInputSchema';
import { RiderComboCreateWithoutPointsInputSchema } from './RiderComboCreateWithoutPointsInputSchema';
import { RiderComboUncheckedCreateWithoutPointsInputSchema } from './RiderComboUncheckedCreateWithoutPointsInputSchema';

export const RiderComboCreateOrConnectWithoutPointsInputSchema: z.ZodType<Prisma.RiderComboCreateOrConnectWithoutPointsInput> = z.object({
  where: z.lazy(() => RiderComboWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RiderComboCreateWithoutPointsInputSchema),z.lazy(() => RiderComboUncheckedCreateWithoutPointsInputSchema) ]),
}).strict();

export default RiderComboCreateOrConnectWithoutPointsInputSchema;
