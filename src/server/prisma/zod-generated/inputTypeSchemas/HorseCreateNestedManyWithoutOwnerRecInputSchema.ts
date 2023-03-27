import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HorseCreateWithoutOwnerRecInputSchema } from './HorseCreateWithoutOwnerRecInputSchema';
import { HorseUncheckedCreateWithoutOwnerRecInputSchema } from './HorseUncheckedCreateWithoutOwnerRecInputSchema';
import { HorseCreateOrConnectWithoutOwnerRecInputSchema } from './HorseCreateOrConnectWithoutOwnerRecInputSchema';
import { HorseCreateManyOwnerRecInputEnvelopeSchema } from './HorseCreateManyOwnerRecInputEnvelopeSchema';
import { HorseWhereUniqueInputSchema } from './HorseWhereUniqueInputSchema';

export const HorseCreateNestedManyWithoutOwnerRecInputSchema: z.ZodType<Prisma.HorseCreateNestedManyWithoutOwnerRecInput> = z.object({
  create: z.union([ z.lazy(() => HorseCreateWithoutOwnerRecInputSchema),z.lazy(() => HorseCreateWithoutOwnerRecInputSchema).array(),z.lazy(() => HorseUncheckedCreateWithoutOwnerRecInputSchema),z.lazy(() => HorseUncheckedCreateWithoutOwnerRecInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HorseCreateOrConnectWithoutOwnerRecInputSchema),z.lazy(() => HorseCreateOrConnectWithoutOwnerRecInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HorseCreateManyOwnerRecInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HorseWhereUniqueInputSchema),z.lazy(() => HorseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default HorseCreateNestedManyWithoutOwnerRecInputSchema;
