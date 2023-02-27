import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { HorseCreateWithoutMemberOwnerInputSchema } from './HorseCreateWithoutMemberOwnerInputSchema';
import { HorseUncheckedCreateWithoutMemberOwnerInputSchema } from './HorseUncheckedCreateWithoutMemberOwnerInputSchema';
import { HorseCreateOrConnectWithoutMemberOwnerInputSchema } from './HorseCreateOrConnectWithoutMemberOwnerInputSchema';
import { HorseUpsertWithWhereUniqueWithoutMemberOwnerInputSchema } from './HorseUpsertWithWhereUniqueWithoutMemberOwnerInputSchema';
import { HorseCreateManyMemberOwnerInputEnvelopeSchema } from './HorseCreateManyMemberOwnerInputEnvelopeSchema';
import { HorseWhereUniqueInputSchema } from './HorseWhereUniqueInputSchema';
import { HorseUpdateWithWhereUniqueWithoutMemberOwnerInputSchema } from './HorseUpdateWithWhereUniqueWithoutMemberOwnerInputSchema';
import { HorseUpdateManyWithWhereWithoutMemberOwnerInputSchema } from './HorseUpdateManyWithWhereWithoutMemberOwnerInputSchema';
import { HorseScalarWhereInputSchema } from './HorseScalarWhereInputSchema';

export const HorseUncheckedUpdateManyWithoutMemberOwnerNestedInputSchema: z.ZodType<Prisma.HorseUncheckedUpdateManyWithoutMemberOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => HorseCreateWithoutMemberOwnerInputSchema),z.lazy(() => HorseCreateWithoutMemberOwnerInputSchema).array(),z.lazy(() => HorseUncheckedCreateWithoutMemberOwnerInputSchema),z.lazy(() => HorseUncheckedCreateWithoutMemberOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HorseCreateOrConnectWithoutMemberOwnerInputSchema),z.lazy(() => HorseCreateOrConnectWithoutMemberOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HorseUpsertWithWhereUniqueWithoutMemberOwnerInputSchema),z.lazy(() => HorseUpsertWithWhereUniqueWithoutMemberOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HorseCreateManyMemberOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HorseWhereUniqueInputSchema),z.lazy(() => HorseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HorseWhereUniqueInputSchema),z.lazy(() => HorseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HorseWhereUniqueInputSchema),z.lazy(() => HorseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HorseWhereUniqueInputSchema),z.lazy(() => HorseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HorseUpdateWithWhereUniqueWithoutMemberOwnerInputSchema),z.lazy(() => HorseUpdateWithWhereUniqueWithoutMemberOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HorseUpdateManyWithWhereWithoutMemberOwnerInputSchema),z.lazy(() => HorseUpdateManyWithWhereWithoutMemberOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HorseScalarWhereInputSchema),z.lazy(() => HorseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default HorseUncheckedUpdateManyWithoutMemberOwnerNestedInputSchema;
