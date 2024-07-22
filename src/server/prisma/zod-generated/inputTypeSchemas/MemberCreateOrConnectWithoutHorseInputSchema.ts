import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MemberWhereUniqueInputSchema } from './MemberWhereUniqueInputSchema';
import { MemberCreateWithoutHorseInputSchema } from './MemberCreateWithoutHorseInputSchema';
import { MemberUncheckedCreateWithoutHorseInputSchema } from './MemberUncheckedCreateWithoutHorseInputSchema';

export const MemberCreateOrConnectWithoutHorseInputSchema: z.ZodType<Prisma.MemberCreateOrConnectWithoutHorseInput> = z.object({
  where: z.lazy(() => MemberWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MemberCreateWithoutHorseInputSchema),z.lazy(() => MemberUncheckedCreateWithoutHorseInputSchema) ]),
}).strict();

export default MemberCreateOrConnectWithoutHorseInputSchema;
