import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { NonMemberHorseOwnerUpdateWithoutHorsesInputSchema } from './NonMemberHorseOwnerUpdateWithoutHorsesInputSchema';
import { NonMemberHorseOwnerUncheckedUpdateWithoutHorsesInputSchema } from './NonMemberHorseOwnerUncheckedUpdateWithoutHorsesInputSchema';
import { NonMemberHorseOwnerCreateWithoutHorsesInputSchema } from './NonMemberHorseOwnerCreateWithoutHorsesInputSchema';
import { NonMemberHorseOwnerUncheckedCreateWithoutHorsesInputSchema } from './NonMemberHorseOwnerUncheckedCreateWithoutHorsesInputSchema';
import { NonMemberHorseOwnerWhereInputSchema } from './NonMemberHorseOwnerWhereInputSchema';

export const NonMemberHorseOwnerUpsertWithoutHorsesInputSchema: z.ZodType<Prisma.NonMemberHorseOwnerUpsertWithoutHorsesInput> = z.object({
  update: z.union([ z.lazy(() => NonMemberHorseOwnerUpdateWithoutHorsesInputSchema),z.lazy(() => NonMemberHorseOwnerUncheckedUpdateWithoutHorsesInputSchema) ]),
  create: z.union([ z.lazy(() => NonMemberHorseOwnerCreateWithoutHorsesInputSchema),z.lazy(() => NonMemberHorseOwnerUncheckedCreateWithoutHorsesInputSchema) ]),
  where: z.lazy(() => NonMemberHorseOwnerWhereInputSchema).optional()
}).strict();

export default NonMemberHorseOwnerUpsertWithoutHorsesInputSchema;
