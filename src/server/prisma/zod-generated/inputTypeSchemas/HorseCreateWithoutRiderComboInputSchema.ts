import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { NonMemberHorseOwnerCreateNestedOneWithoutHorsesInputSchema } from './NonMemberHorseOwnerCreateNestedOneWithoutHorsesInputSchema';
import { MemberCreateNestedOneWithoutHorseInputSchema } from './MemberCreateNestedOneWithoutHorseInputSchema';
import { StatusSchema } from './StatusSchema';

export const HorseCreateWithoutRiderComboInputSchema: z.ZodType<Prisma.HorseCreateWithoutRiderComboInput> = z.object({
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  horseRN: z.string(),
  horseAKA: z.string().optional().nullable(),
  ownerRec: z.lazy(() => NonMemberHorseOwnerCreateNestedOneWithoutHorsesInputSchema).optional(),
  memberOwner: z.lazy(() => MemberCreateNestedOneWithoutHorseInputSchema).optional(),
  registrationDate: z.coerce.date().optional().nullable(),
  regType: z.lazy(() => StatusSchema)
}).strict();

export default HorseCreateWithoutRiderComboInputSchema;
