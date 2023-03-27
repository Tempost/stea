import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PointsCreateWithoutRiderComboInputSchema } from './PointsCreateWithoutRiderComboInputSchema';
import { PointsUncheckedCreateWithoutRiderComboInputSchema } from './PointsUncheckedCreateWithoutRiderComboInputSchema';
import { PointsCreateOrConnectWithoutRiderComboInputSchema } from './PointsCreateOrConnectWithoutRiderComboInputSchema';
import { PointsUpsertWithWhereUniqueWithoutRiderComboInputSchema } from './PointsUpsertWithWhereUniqueWithoutRiderComboInputSchema';
import { PointsCreateManyRiderComboInputEnvelopeSchema } from './PointsCreateManyRiderComboInputEnvelopeSchema';
import { PointsWhereUniqueInputSchema } from './PointsWhereUniqueInputSchema';
import { PointsUpdateWithWhereUniqueWithoutRiderComboInputSchema } from './PointsUpdateWithWhereUniqueWithoutRiderComboInputSchema';
import { PointsUpdateManyWithWhereWithoutRiderComboInputSchema } from './PointsUpdateManyWithWhereWithoutRiderComboInputSchema';
import { PointsScalarWhereInputSchema } from './PointsScalarWhereInputSchema';

export const PointsUpdateManyWithoutRiderComboNestedInputSchema: z.ZodType<Prisma.PointsUpdateManyWithoutRiderComboNestedInput> = z.object({
  create: z.union([ z.lazy(() => PointsCreateWithoutRiderComboInputSchema),z.lazy(() => PointsCreateWithoutRiderComboInputSchema).array(),z.lazy(() => PointsUncheckedCreateWithoutRiderComboInputSchema),z.lazy(() => PointsUncheckedCreateWithoutRiderComboInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PointsCreateOrConnectWithoutRiderComboInputSchema),z.lazy(() => PointsCreateOrConnectWithoutRiderComboInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PointsUpsertWithWhereUniqueWithoutRiderComboInputSchema),z.lazy(() => PointsUpsertWithWhereUniqueWithoutRiderComboInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PointsCreateManyRiderComboInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PointsWhereUniqueInputSchema),z.lazy(() => PointsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PointsWhereUniqueInputSchema),z.lazy(() => PointsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PointsWhereUniqueInputSchema),z.lazy(() => PointsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PointsWhereUniqueInputSchema),z.lazy(() => PointsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PointsUpdateWithWhereUniqueWithoutRiderComboInputSchema),z.lazy(() => PointsUpdateWithWhereUniqueWithoutRiderComboInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PointsUpdateManyWithWhereWithoutRiderComboInputSchema),z.lazy(() => PointsUpdateManyWithWhereWithoutRiderComboInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PointsScalarWhereInputSchema),z.lazy(() => PointsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default PointsUpdateManyWithoutRiderComboNestedInputSchema;
