import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PointsCreateWithoutShowInputSchema } from './PointsCreateWithoutShowInputSchema';
import { PointsUncheckedCreateWithoutShowInputSchema } from './PointsUncheckedCreateWithoutShowInputSchema';
import { PointsCreateOrConnectWithoutShowInputSchema } from './PointsCreateOrConnectWithoutShowInputSchema';
import { PointsCreateManyShowInputEnvelopeSchema } from './PointsCreateManyShowInputEnvelopeSchema';
import { PointsWhereUniqueInputSchema } from './PointsWhereUniqueInputSchema';

export const PointsUncheckedCreateNestedManyWithoutShowInputSchema: z.ZodType<Prisma.PointsUncheckedCreateNestedManyWithoutShowInput> = z.object({
  create: z.union([ z.lazy(() => PointsCreateWithoutShowInputSchema),z.lazy(() => PointsCreateWithoutShowInputSchema).array(),z.lazy(() => PointsUncheckedCreateWithoutShowInputSchema),z.lazy(() => PointsUncheckedCreateWithoutShowInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PointsCreateOrConnectWithoutShowInputSchema),z.lazy(() => PointsCreateOrConnectWithoutShowInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PointsCreateManyShowInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PointsWhereUniqueInputSchema),z.lazy(() => PointsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default PointsUncheckedCreateNestedManyWithoutShowInputSchema;
