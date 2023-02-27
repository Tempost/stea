import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { HorseWhereUniqueInputSchema } from './HorseWhereUniqueInputSchema';
import { HorseCreateWithoutMemberOwnerInputSchema } from './HorseCreateWithoutMemberOwnerInputSchema';
import { HorseUncheckedCreateWithoutMemberOwnerInputSchema } from './HorseUncheckedCreateWithoutMemberOwnerInputSchema';

export const HorseCreateOrConnectWithoutMemberOwnerInputSchema: z.ZodType<Prisma.HorseCreateOrConnectWithoutMemberOwnerInput> = z.object({
  where: z.lazy(() => HorseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HorseCreateWithoutMemberOwnerInputSchema),z.lazy(() => HorseUncheckedCreateWithoutMemberOwnerInputSchema) ]),
}).strict();

export default HorseCreateOrConnectWithoutMemberOwnerInputSchema;
