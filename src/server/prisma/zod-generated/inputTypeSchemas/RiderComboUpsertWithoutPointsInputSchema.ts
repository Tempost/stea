import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { RiderComboUpdateWithoutPointsInputSchema } from './RiderComboUpdateWithoutPointsInputSchema';
import { RiderComboUncheckedUpdateWithoutPointsInputSchema } from './RiderComboUncheckedUpdateWithoutPointsInputSchema';
import { RiderComboCreateWithoutPointsInputSchema } from './RiderComboCreateWithoutPointsInputSchema';
import { RiderComboUncheckedCreateWithoutPointsInputSchema } from './RiderComboUncheckedCreateWithoutPointsInputSchema';

export const RiderComboUpsertWithoutPointsInputSchema: z.ZodType<Prisma.RiderComboUpsertWithoutPointsInput> = z.object({
  update: z.union([ z.lazy(() => RiderComboUpdateWithoutPointsInputSchema),z.lazy(() => RiderComboUncheckedUpdateWithoutPointsInputSchema) ]),
  create: z.union([ z.lazy(() => RiderComboCreateWithoutPointsInputSchema),z.lazy(() => RiderComboUncheckedCreateWithoutPointsInputSchema) ]),
}).strict();

export default RiderComboUpsertWithoutPointsInputSchema;
