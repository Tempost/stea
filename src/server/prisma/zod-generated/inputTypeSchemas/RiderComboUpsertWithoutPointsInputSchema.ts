import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RiderComboUpdateWithoutPointsInputSchema } from './RiderComboUpdateWithoutPointsInputSchema';
import { RiderComboUncheckedUpdateWithoutPointsInputSchema } from './RiderComboUncheckedUpdateWithoutPointsInputSchema';
import { RiderComboCreateWithoutPointsInputSchema } from './RiderComboCreateWithoutPointsInputSchema';
import { RiderComboUncheckedCreateWithoutPointsInputSchema } from './RiderComboUncheckedCreateWithoutPointsInputSchema';
import { RiderComboWhereInputSchema } from './RiderComboWhereInputSchema';

export const RiderComboUpsertWithoutPointsInputSchema: z.ZodType<Prisma.RiderComboUpsertWithoutPointsInput> = z.object({
  update: z.union([ z.lazy(() => RiderComboUpdateWithoutPointsInputSchema),z.lazy(() => RiderComboUncheckedUpdateWithoutPointsInputSchema) ]),
  create: z.union([ z.lazy(() => RiderComboCreateWithoutPointsInputSchema),z.lazy(() => RiderComboUncheckedCreateWithoutPointsInputSchema) ]),
  where: z.lazy(() => RiderComboWhereInputSchema).optional()
}).strict();

export default RiderComboUpsertWithoutPointsInputSchema;
