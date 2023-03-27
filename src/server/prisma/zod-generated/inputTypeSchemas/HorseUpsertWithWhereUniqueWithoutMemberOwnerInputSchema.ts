import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HorseWhereUniqueInputSchema } from './HorseWhereUniqueInputSchema';
import { HorseUpdateWithoutMemberOwnerInputSchema } from './HorseUpdateWithoutMemberOwnerInputSchema';
import { HorseUncheckedUpdateWithoutMemberOwnerInputSchema } from './HorseUncheckedUpdateWithoutMemberOwnerInputSchema';
import { HorseCreateWithoutMemberOwnerInputSchema } from './HorseCreateWithoutMemberOwnerInputSchema';
import { HorseUncheckedCreateWithoutMemberOwnerInputSchema } from './HorseUncheckedCreateWithoutMemberOwnerInputSchema';

export const HorseUpsertWithWhereUniqueWithoutMemberOwnerInputSchema: z.ZodType<Prisma.HorseUpsertWithWhereUniqueWithoutMemberOwnerInput> = z.object({
  where: z.lazy(() => HorseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => HorseUpdateWithoutMemberOwnerInputSchema),z.lazy(() => HorseUncheckedUpdateWithoutMemberOwnerInputSchema) ]),
  create: z.union([ z.lazy(() => HorseCreateWithoutMemberOwnerInputSchema),z.lazy(() => HorseUncheckedCreateWithoutMemberOwnerInputSchema) ]),
}).strict();

export default HorseUpsertWithWhereUniqueWithoutMemberOwnerInputSchema;
