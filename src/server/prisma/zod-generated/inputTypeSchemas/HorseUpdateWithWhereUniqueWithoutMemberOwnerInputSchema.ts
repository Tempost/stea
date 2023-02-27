import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { HorseWhereUniqueInputSchema } from './HorseWhereUniqueInputSchema';
import { HorseUpdateWithoutMemberOwnerInputSchema } from './HorseUpdateWithoutMemberOwnerInputSchema';
import { HorseUncheckedUpdateWithoutMemberOwnerInputSchema } from './HorseUncheckedUpdateWithoutMemberOwnerInputSchema';

export const HorseUpdateWithWhereUniqueWithoutMemberOwnerInputSchema: z.ZodType<Prisma.HorseUpdateWithWhereUniqueWithoutMemberOwnerInput> = z.object({
  where: z.lazy(() => HorseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => HorseUpdateWithoutMemberOwnerInputSchema),z.lazy(() => HorseUncheckedUpdateWithoutMemberOwnerInputSchema) ]),
}).strict();

export default HorseUpdateWithWhereUniqueWithoutMemberOwnerInputSchema;
