import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RiderComboCreateWithoutHorseInputSchema } from './RiderComboCreateWithoutHorseInputSchema';
import { RiderComboUncheckedCreateWithoutHorseInputSchema } from './RiderComboUncheckedCreateWithoutHorseInputSchema';
import { RiderComboCreateOrConnectWithoutHorseInputSchema } from './RiderComboCreateOrConnectWithoutHorseInputSchema';
import { RiderComboUpsertWithWhereUniqueWithoutHorseInputSchema } from './RiderComboUpsertWithWhereUniqueWithoutHorseInputSchema';
import { RiderComboCreateManyHorseInputEnvelopeSchema } from './RiderComboCreateManyHorseInputEnvelopeSchema';
import { RiderComboWhereUniqueInputSchema } from './RiderComboWhereUniqueInputSchema';
import { RiderComboUpdateWithWhereUniqueWithoutHorseInputSchema } from './RiderComboUpdateWithWhereUniqueWithoutHorseInputSchema';
import { RiderComboUpdateManyWithWhereWithoutHorseInputSchema } from './RiderComboUpdateManyWithWhereWithoutHorseInputSchema';
import { RiderComboScalarWhereInputSchema } from './RiderComboScalarWhereInputSchema';

export const RiderComboUpdateManyWithoutHorseNestedInputSchema: z.ZodType<Prisma.RiderComboUpdateManyWithoutHorseNestedInput> = z.object({
  create: z.union([ z.lazy(() => RiderComboCreateWithoutHorseInputSchema),z.lazy(() => RiderComboCreateWithoutHorseInputSchema).array(),z.lazy(() => RiderComboUncheckedCreateWithoutHorseInputSchema),z.lazy(() => RiderComboUncheckedCreateWithoutHorseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RiderComboCreateOrConnectWithoutHorseInputSchema),z.lazy(() => RiderComboCreateOrConnectWithoutHorseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RiderComboUpsertWithWhereUniqueWithoutHorseInputSchema),z.lazy(() => RiderComboUpsertWithWhereUniqueWithoutHorseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RiderComboCreateManyHorseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RiderComboWhereUniqueInputSchema),z.lazy(() => RiderComboWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RiderComboWhereUniqueInputSchema),z.lazy(() => RiderComboWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RiderComboWhereUniqueInputSchema),z.lazy(() => RiderComboWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RiderComboWhereUniqueInputSchema),z.lazy(() => RiderComboWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RiderComboUpdateWithWhereUniqueWithoutHorseInputSchema),z.lazy(() => RiderComboUpdateWithWhereUniqueWithoutHorseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RiderComboUpdateManyWithWhereWithoutHorseInputSchema),z.lazy(() => RiderComboUpdateManyWithWhereWithoutHorseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RiderComboScalarWhereInputSchema),z.lazy(() => RiderComboScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default RiderComboUpdateManyWithoutHorseNestedInputSchema;
