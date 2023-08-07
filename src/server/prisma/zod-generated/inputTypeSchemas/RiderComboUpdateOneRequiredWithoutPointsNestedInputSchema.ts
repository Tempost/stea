import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RiderComboCreateWithoutPointsInputSchema } from './RiderComboCreateWithoutPointsInputSchema';
import { RiderComboUncheckedCreateWithoutPointsInputSchema } from './RiderComboUncheckedCreateWithoutPointsInputSchema';
import { RiderComboCreateOrConnectWithoutPointsInputSchema } from './RiderComboCreateOrConnectWithoutPointsInputSchema';
import { RiderComboUpsertWithoutPointsInputSchema } from './RiderComboUpsertWithoutPointsInputSchema';
import { RiderComboWhereUniqueInputSchema } from './RiderComboWhereUniqueInputSchema';
import { RiderComboUpdateToOneWithWhereWithoutPointsInputSchema } from './RiderComboUpdateToOneWithWhereWithoutPointsInputSchema';
import { RiderComboUpdateWithoutPointsInputSchema } from './RiderComboUpdateWithoutPointsInputSchema';
import { RiderComboUncheckedUpdateWithoutPointsInputSchema } from './RiderComboUncheckedUpdateWithoutPointsInputSchema';

export const RiderComboUpdateOneRequiredWithoutPointsNestedInputSchema: z.ZodType<Prisma.RiderComboUpdateOneRequiredWithoutPointsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RiderComboCreateWithoutPointsInputSchema),z.lazy(() => RiderComboUncheckedCreateWithoutPointsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RiderComboCreateOrConnectWithoutPointsInputSchema).optional(),
  upsert: z.lazy(() => RiderComboUpsertWithoutPointsInputSchema).optional(),
  connect: z.lazy(() => RiderComboWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RiderComboUpdateToOneWithWhereWithoutPointsInputSchema),z.lazy(() => RiderComboUpdateWithoutPointsInputSchema),z.lazy(() => RiderComboUncheckedUpdateWithoutPointsInputSchema) ]).optional(),
}).strict();

export default RiderComboUpdateOneRequiredWithoutPointsNestedInputSchema;
