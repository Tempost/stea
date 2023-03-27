import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HorseCreateWithoutMemberOwnerInputSchema } from './HorseCreateWithoutMemberOwnerInputSchema';
import { HorseUncheckedCreateWithoutMemberOwnerInputSchema } from './HorseUncheckedCreateWithoutMemberOwnerInputSchema';
import { HorseCreateOrConnectWithoutMemberOwnerInputSchema } from './HorseCreateOrConnectWithoutMemberOwnerInputSchema';
import { HorseCreateManyMemberOwnerInputEnvelopeSchema } from './HorseCreateManyMemberOwnerInputEnvelopeSchema';
import { HorseWhereUniqueInputSchema } from './HorseWhereUniqueInputSchema';

export const HorseUncheckedCreateNestedManyWithoutMemberOwnerInputSchema: z.ZodType<Prisma.HorseUncheckedCreateNestedManyWithoutMemberOwnerInput> = z.object({
  create: z.union([ z.lazy(() => HorseCreateWithoutMemberOwnerInputSchema),z.lazy(() => HorseCreateWithoutMemberOwnerInputSchema).array(),z.lazy(() => HorseUncheckedCreateWithoutMemberOwnerInputSchema),z.lazy(() => HorseUncheckedCreateWithoutMemberOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HorseCreateOrConnectWithoutMemberOwnerInputSchema),z.lazy(() => HorseCreateOrConnectWithoutMemberOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HorseCreateManyMemberOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HorseWhereUniqueInputSchema),z.lazy(() => HorseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default HorseUncheckedCreateNestedManyWithoutMemberOwnerInputSchema;
