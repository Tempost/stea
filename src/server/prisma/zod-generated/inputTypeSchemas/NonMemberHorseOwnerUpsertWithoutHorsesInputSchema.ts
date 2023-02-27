import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { NonMemberHorseOwnerUpdateWithoutHorsesInputSchema } from './NonMemberHorseOwnerUpdateWithoutHorsesInputSchema';
import { NonMemberHorseOwnerUncheckedUpdateWithoutHorsesInputSchema } from './NonMemberHorseOwnerUncheckedUpdateWithoutHorsesInputSchema';
import { NonMemberHorseOwnerCreateWithoutHorsesInputSchema } from './NonMemberHorseOwnerCreateWithoutHorsesInputSchema';
import { NonMemberHorseOwnerUncheckedCreateWithoutHorsesInputSchema } from './NonMemberHorseOwnerUncheckedCreateWithoutHorsesInputSchema';

export const NonMemberHorseOwnerUpsertWithoutHorsesInputSchema: z.ZodType<Prisma.NonMemberHorseOwnerUpsertWithoutHorsesInput> = z.object({
  update: z.union([ z.lazy(() => NonMemberHorseOwnerUpdateWithoutHorsesInputSchema),z.lazy(() => NonMemberHorseOwnerUncheckedUpdateWithoutHorsesInputSchema) ]),
  create: z.union([ z.lazy(() => NonMemberHorseOwnerCreateWithoutHorsesInputSchema),z.lazy(() => NonMemberHorseOwnerUncheckedCreateWithoutHorsesInputSchema) ]),
}).strict();

export default NonMemberHorseOwnerUpsertWithoutHorsesInputSchema;
