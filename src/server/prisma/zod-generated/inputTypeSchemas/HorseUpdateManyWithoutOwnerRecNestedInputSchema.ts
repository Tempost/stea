import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { HorseCreateWithoutOwnerRecInputSchema } from './HorseCreateWithoutOwnerRecInputSchema';
import { HorseUncheckedCreateWithoutOwnerRecInputSchema } from './HorseUncheckedCreateWithoutOwnerRecInputSchema';
import { HorseCreateOrConnectWithoutOwnerRecInputSchema } from './HorseCreateOrConnectWithoutOwnerRecInputSchema';
import { HorseUpsertWithWhereUniqueWithoutOwnerRecInputSchema } from './HorseUpsertWithWhereUniqueWithoutOwnerRecInputSchema';
import { HorseCreateManyOwnerRecInputEnvelopeSchema } from './HorseCreateManyOwnerRecInputEnvelopeSchema';
import { HorseWhereUniqueInputSchema } from './HorseWhereUniqueInputSchema';
import { HorseUpdateWithWhereUniqueWithoutOwnerRecInputSchema } from './HorseUpdateWithWhereUniqueWithoutOwnerRecInputSchema';
import { HorseUpdateManyWithWhereWithoutOwnerRecInputSchema } from './HorseUpdateManyWithWhereWithoutOwnerRecInputSchema';
import { HorseScalarWhereInputSchema } from './HorseScalarWhereInputSchema';

export const HorseUpdateManyWithoutOwnerRecNestedInputSchema: z.ZodType<Prisma.HorseUpdateManyWithoutOwnerRecNestedInput> = z.object({
  create: z.union([ z.lazy(() => HorseCreateWithoutOwnerRecInputSchema),z.lazy(() => HorseCreateWithoutOwnerRecInputSchema).array(),z.lazy(() => HorseUncheckedCreateWithoutOwnerRecInputSchema),z.lazy(() => HorseUncheckedCreateWithoutOwnerRecInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HorseCreateOrConnectWithoutOwnerRecInputSchema),z.lazy(() => HorseCreateOrConnectWithoutOwnerRecInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HorseUpsertWithWhereUniqueWithoutOwnerRecInputSchema),z.lazy(() => HorseUpsertWithWhereUniqueWithoutOwnerRecInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HorseCreateManyOwnerRecInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HorseWhereUniqueInputSchema),z.lazy(() => HorseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HorseWhereUniqueInputSchema),z.lazy(() => HorseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HorseWhereUniqueInputSchema),z.lazy(() => HorseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HorseWhereUniqueInputSchema),z.lazy(() => HorseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HorseUpdateWithWhereUniqueWithoutOwnerRecInputSchema),z.lazy(() => HorseUpdateWithWhereUniqueWithoutOwnerRecInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HorseUpdateManyWithWhereWithoutOwnerRecInputSchema),z.lazy(() => HorseUpdateManyWithWhereWithoutOwnerRecInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HorseScalarWhereInputSchema),z.lazy(() => HorseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default HorseUpdateManyWithoutOwnerRecNestedInputSchema;
