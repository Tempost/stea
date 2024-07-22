import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RiderComboCreateWithoutPointsInputSchema } from './RiderComboCreateWithoutPointsInputSchema';
import { RiderComboUncheckedCreateWithoutPointsInputSchema } from './RiderComboUncheckedCreateWithoutPointsInputSchema';
import { RiderComboCreateOrConnectWithoutPointsInputSchema } from './RiderComboCreateOrConnectWithoutPointsInputSchema';
import { RiderComboWhereUniqueInputSchema } from './RiderComboWhereUniqueInputSchema';

export const RiderComboCreateNestedOneWithoutPointsInputSchema: z.ZodType<Prisma.RiderComboCreateNestedOneWithoutPointsInput> = z.object({
  create: z.union([ z.lazy(() => RiderComboCreateWithoutPointsInputSchema),z.lazy(() => RiderComboUncheckedCreateWithoutPointsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RiderComboCreateOrConnectWithoutPointsInputSchema).optional(),
  connect: z.lazy(() => RiderComboWhereUniqueInputSchema).optional()
}).strict();

export default RiderComboCreateNestedOneWithoutPointsInputSchema;
