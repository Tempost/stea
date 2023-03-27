import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MemberUpdateWithoutHorseInputSchema } from './MemberUpdateWithoutHorseInputSchema';
import { MemberUncheckedUpdateWithoutHorseInputSchema } from './MemberUncheckedUpdateWithoutHorseInputSchema';
import { MemberCreateWithoutHorseInputSchema } from './MemberCreateWithoutHorseInputSchema';
import { MemberUncheckedCreateWithoutHorseInputSchema } from './MemberUncheckedCreateWithoutHorseInputSchema';

export const MemberUpsertWithoutHorseInputSchema: z.ZodType<Prisma.MemberUpsertWithoutHorseInput> = z.object({
  update: z.union([ z.lazy(() => MemberUpdateWithoutHorseInputSchema),z.lazy(() => MemberUncheckedUpdateWithoutHorseInputSchema) ]),
  create: z.union([ z.lazy(() => MemberCreateWithoutHorseInputSchema),z.lazy(() => MemberUncheckedCreateWithoutHorseInputSchema) ]),
}).strict();

export default MemberUpsertWithoutHorseInputSchema;
