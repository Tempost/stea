import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { PointsCreateWithoutRiderComboInputSchema } from './PointsCreateWithoutRiderComboInputSchema';
import { PointsUncheckedCreateWithoutRiderComboInputSchema } from './PointsUncheckedCreateWithoutRiderComboInputSchema';
import { PointsCreateOrConnectWithoutRiderComboInputSchema } from './PointsCreateOrConnectWithoutRiderComboInputSchema';
import { PointsCreateManyRiderComboInputEnvelopeSchema } from './PointsCreateManyRiderComboInputEnvelopeSchema';
import { PointsWhereUniqueInputSchema } from './PointsWhereUniqueInputSchema';

export const PointsCreateNestedManyWithoutRiderComboInputSchema: z.ZodType<Prisma.PointsCreateNestedManyWithoutRiderComboInput> = z.object({
  create: z.union([ z.lazy(() => PointsCreateWithoutRiderComboInputSchema),z.lazy(() => PointsCreateWithoutRiderComboInputSchema).array(),z.lazy(() => PointsUncheckedCreateWithoutRiderComboInputSchema),z.lazy(() => PointsUncheckedCreateWithoutRiderComboInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PointsCreateOrConnectWithoutRiderComboInputSchema),z.lazy(() => PointsCreateOrConnectWithoutRiderComboInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PointsCreateManyRiderComboInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PointsWhereUniqueInputSchema),z.lazy(() => PointsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default PointsCreateNestedManyWithoutRiderComboInputSchema;
