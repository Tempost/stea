import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MemberCreateWithoutHorseInputSchema } from './MemberCreateWithoutHorseInputSchema';
import { MemberUncheckedCreateWithoutHorseInputSchema } from './MemberUncheckedCreateWithoutHorseInputSchema';
import { MemberCreateOrConnectWithoutHorseInputSchema } from './MemberCreateOrConnectWithoutHorseInputSchema';
import { MemberWhereUniqueInputSchema } from './MemberWhereUniqueInputSchema';

export const MemberCreateNestedOneWithoutHorseInputSchema: z.ZodType<Prisma.MemberCreateNestedOneWithoutHorseInput> = z.object({
  create: z.union([ z.lazy(() => MemberCreateWithoutHorseInputSchema),z.lazy(() => MemberUncheckedCreateWithoutHorseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MemberCreateOrConnectWithoutHorseInputSchema).optional(),
  connect: z.lazy(() => MemberWhereUniqueInputSchema).optional()
}).strict();

export default MemberCreateNestedOneWithoutHorseInputSchema;
