import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NonMemberHorseOwnerWhereInputSchema } from './NonMemberHorseOwnerWhereInputSchema';
import { NonMemberHorseOwnerUpdateWithoutHorsesInputSchema } from './NonMemberHorseOwnerUpdateWithoutHorsesInputSchema';
import { NonMemberHorseOwnerUncheckedUpdateWithoutHorsesInputSchema } from './NonMemberHorseOwnerUncheckedUpdateWithoutHorsesInputSchema';

export const NonMemberHorseOwnerUpdateToOneWithWhereWithoutHorsesInputSchema: z.ZodType<Prisma.NonMemberHorseOwnerUpdateToOneWithWhereWithoutHorsesInput> = z.object({
  where: z.lazy(() => NonMemberHorseOwnerWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => NonMemberHorseOwnerUpdateWithoutHorsesInputSchema),z.lazy(() => NonMemberHorseOwnerUncheckedUpdateWithoutHorsesInputSchema) ]),
}).strict();

export default NonMemberHorseOwnerUpdateToOneWithWhereWithoutHorsesInputSchema;
