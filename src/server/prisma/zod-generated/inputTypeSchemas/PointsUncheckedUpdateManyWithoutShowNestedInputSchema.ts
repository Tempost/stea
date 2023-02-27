import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { PointsCreateWithoutShowInputSchema } from './PointsCreateWithoutShowInputSchema';
import { PointsUncheckedCreateWithoutShowInputSchema } from './PointsUncheckedCreateWithoutShowInputSchema';
import { PointsCreateOrConnectWithoutShowInputSchema } from './PointsCreateOrConnectWithoutShowInputSchema';
import { PointsUpsertWithWhereUniqueWithoutShowInputSchema } from './PointsUpsertWithWhereUniqueWithoutShowInputSchema';
import { PointsCreateManyShowInputEnvelopeSchema } from './PointsCreateManyShowInputEnvelopeSchema';
import { PointsWhereUniqueInputSchema } from './PointsWhereUniqueInputSchema';
import { PointsUpdateWithWhereUniqueWithoutShowInputSchema } from './PointsUpdateWithWhereUniqueWithoutShowInputSchema';
import { PointsUpdateManyWithWhereWithoutShowInputSchema } from './PointsUpdateManyWithWhereWithoutShowInputSchema';
import { PointsScalarWhereInputSchema } from './PointsScalarWhereInputSchema';

export const PointsUncheckedUpdateManyWithoutShowNestedInputSchema: z.ZodType<Prisma.PointsUncheckedUpdateManyWithoutShowNestedInput> = z.object({
  create: z.union([ z.lazy(() => PointsCreateWithoutShowInputSchema),z.lazy(() => PointsCreateWithoutShowInputSchema).array(),z.lazy(() => PointsUncheckedCreateWithoutShowInputSchema),z.lazy(() => PointsUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PointsCreateOrConnectWithoutShowInputSchema),z.lazy(() => PointsCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PointsUpsertWithWhereUniqueWithoutShowInputSchema),z.lazy(() => PointsUpsertWithWhereUniqueWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PointsCreateManyShowInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PointsWhereUniqueInputSchema),z.lazy(() => PointsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PointsWhereUniqueInputSchema),z.lazy(() => PointsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PointsWhereUniqueInputSchema),z.lazy(() => PointsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PointsWhereUniqueInputSchema),z.lazy(() => PointsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PointsUpdateWithWhereUniqueWithoutShowInputSchema),z.lazy(() => PointsUpdateWithWhereUniqueWithoutShowInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PointsUpdateManyWithWhereWithoutShowInputSchema),z.lazy(() => PointsUpdateManyWithWhereWithoutShowInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PointsScalarWhereInputSchema),z.lazy(() => PointsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default PointsUncheckedUpdateManyWithoutShowNestedInputSchema;
