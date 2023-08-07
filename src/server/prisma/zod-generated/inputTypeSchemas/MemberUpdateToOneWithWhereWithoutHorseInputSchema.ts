import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MemberWhereInputSchema } from './MemberWhereInputSchema';
import { MemberUpdateWithoutHorseInputSchema } from './MemberUpdateWithoutHorseInputSchema';
import { MemberUncheckedUpdateWithoutHorseInputSchema } from './MemberUncheckedUpdateWithoutHorseInputSchema';

export const MemberUpdateToOneWithWhereWithoutHorseInputSchema: z.ZodType<Prisma.MemberUpdateToOneWithWhereWithoutHorseInput> = z.object({
  where: z.lazy(() => MemberWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MemberUpdateWithoutHorseInputSchema),z.lazy(() => MemberUncheckedUpdateWithoutHorseInputSchema) ]),
}).strict();

export default MemberUpdateToOneWithWhereWithoutHorseInputSchema;
