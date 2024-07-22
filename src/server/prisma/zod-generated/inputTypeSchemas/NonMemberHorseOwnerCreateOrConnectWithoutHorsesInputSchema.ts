import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NonMemberHorseOwnerWhereUniqueInputSchema } from './NonMemberHorseOwnerWhereUniqueInputSchema';
import { NonMemberHorseOwnerCreateWithoutHorsesInputSchema } from './NonMemberHorseOwnerCreateWithoutHorsesInputSchema';
import { NonMemberHorseOwnerUncheckedCreateWithoutHorsesInputSchema } from './NonMemberHorseOwnerUncheckedCreateWithoutHorsesInputSchema';

export const NonMemberHorseOwnerCreateOrConnectWithoutHorsesInputSchema: z.ZodType<Prisma.NonMemberHorseOwnerCreateOrConnectWithoutHorsesInput> = z.object({
  where: z.lazy(() => NonMemberHorseOwnerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NonMemberHorseOwnerCreateWithoutHorsesInputSchema),z.lazy(() => NonMemberHorseOwnerUncheckedCreateWithoutHorsesInputSchema) ]),
}).strict();

export default NonMemberHorseOwnerCreateOrConnectWithoutHorsesInputSchema;
