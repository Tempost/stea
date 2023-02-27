import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { HorseWhereUniqueInputSchema } from './HorseWhereUniqueInputSchema';
import { HorseUpdateWithoutOwnerRecInputSchema } from './HorseUpdateWithoutOwnerRecInputSchema';
import { HorseUncheckedUpdateWithoutOwnerRecInputSchema } from './HorseUncheckedUpdateWithoutOwnerRecInputSchema';
import { HorseCreateWithoutOwnerRecInputSchema } from './HorseCreateWithoutOwnerRecInputSchema';
import { HorseUncheckedCreateWithoutOwnerRecInputSchema } from './HorseUncheckedCreateWithoutOwnerRecInputSchema';

export const HorseUpsertWithWhereUniqueWithoutOwnerRecInputSchema: z.ZodType<Prisma.HorseUpsertWithWhereUniqueWithoutOwnerRecInput> = z.object({
  where: z.lazy(() => HorseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => HorseUpdateWithoutOwnerRecInputSchema),z.lazy(() => HorseUncheckedUpdateWithoutOwnerRecInputSchema) ]),
  create: z.union([ z.lazy(() => HorseCreateWithoutOwnerRecInputSchema),z.lazy(() => HorseUncheckedCreateWithoutOwnerRecInputSchema) ]),
}).strict();

export default HorseUpsertWithWhereUniqueWithoutOwnerRecInputSchema;
