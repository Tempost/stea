import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { RiderComboCreateWithoutMemberInputSchema } from './RiderComboCreateWithoutMemberInputSchema';
import { RiderComboUncheckedCreateWithoutMemberInputSchema } from './RiderComboUncheckedCreateWithoutMemberInputSchema';
import { RiderComboCreateOrConnectWithoutMemberInputSchema } from './RiderComboCreateOrConnectWithoutMemberInputSchema';
import { RiderComboUpsertWithWhereUniqueWithoutMemberInputSchema } from './RiderComboUpsertWithWhereUniqueWithoutMemberInputSchema';
import { RiderComboCreateManyMemberInputEnvelopeSchema } from './RiderComboCreateManyMemberInputEnvelopeSchema';
import { RiderComboWhereUniqueInputSchema } from './RiderComboWhereUniqueInputSchema';
import { RiderComboUpdateWithWhereUniqueWithoutMemberInputSchema } from './RiderComboUpdateWithWhereUniqueWithoutMemberInputSchema';
import { RiderComboUpdateManyWithWhereWithoutMemberInputSchema } from './RiderComboUpdateManyWithWhereWithoutMemberInputSchema';
import { RiderComboScalarWhereInputSchema } from './RiderComboScalarWhereInputSchema';

export const RiderComboUncheckedUpdateManyWithoutMemberNestedInputSchema: z.ZodType<Prisma.RiderComboUncheckedUpdateManyWithoutMemberNestedInput> = z.object({
  create: z.union([ z.lazy(() => RiderComboCreateWithoutMemberInputSchema),z.lazy(() => RiderComboCreateWithoutMemberInputSchema).array(),z.lazy(() => RiderComboUncheckedCreateWithoutMemberInputSchema),z.lazy(() => RiderComboUncheckedCreateWithoutMemberInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RiderComboCreateOrConnectWithoutMemberInputSchema),z.lazy(() => RiderComboCreateOrConnectWithoutMemberInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RiderComboUpsertWithWhereUniqueWithoutMemberInputSchema),z.lazy(() => RiderComboUpsertWithWhereUniqueWithoutMemberInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RiderComboCreateManyMemberInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RiderComboWhereUniqueInputSchema),z.lazy(() => RiderComboWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RiderComboWhereUniqueInputSchema),z.lazy(() => RiderComboWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RiderComboWhereUniqueInputSchema),z.lazy(() => RiderComboWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RiderComboWhereUniqueInputSchema),z.lazy(() => RiderComboWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RiderComboUpdateWithWhereUniqueWithoutMemberInputSchema),z.lazy(() => RiderComboUpdateWithWhereUniqueWithoutMemberInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RiderComboUpdateManyWithWhereWithoutMemberInputSchema),z.lazy(() => RiderComboUpdateManyWithWhereWithoutMemberInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RiderComboScalarWhereInputSchema),z.lazy(() => RiderComboScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default RiderComboUncheckedUpdateManyWithoutMemberNestedInputSchema;
