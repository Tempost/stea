import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MemberUpdateWithoutHorseInputSchema } from './MemberUpdateWithoutHorseInputSchema';
import { MemberUncheckedUpdateWithoutHorseInputSchema } from './MemberUncheckedUpdateWithoutHorseInputSchema';
import { MemberCreateWithoutHorseInputSchema } from './MemberCreateWithoutHorseInputSchema';
import { MemberUncheckedCreateWithoutHorseInputSchema } from './MemberUncheckedCreateWithoutHorseInputSchema';
import { MemberWhereInputSchema } from './MemberWhereInputSchema';

export const MemberUpsertWithoutHorseInputSchema: z.ZodType<Prisma.MemberUpsertWithoutHorseInput> = z.object({
  update: z.union([ z.lazy(() => MemberUpdateWithoutHorseInputSchema),z.lazy(() => MemberUncheckedUpdateWithoutHorseInputSchema) ]),
  create: z.union([ z.lazy(() => MemberCreateWithoutHorseInputSchema),z.lazy(() => MemberUncheckedCreateWithoutHorseInputSchema) ]),
  where: z.lazy(() => MemberWhereInputSchema).optional()
}).strict();

export default MemberUpsertWithoutHorseInputSchema;
