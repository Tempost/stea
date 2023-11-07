import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StatusSchema } from './StatusSchema';
import { NonMemberHorseOwnerCreateNestedOneWithoutHorsesInputSchema } from './NonMemberHorseOwnerCreateNestedOneWithoutHorsesInputSchema';
import { MemberCreateNestedOneWithoutHorseInputSchema } from './MemberCreateNestedOneWithoutHorseInputSchema';

export const HorseCreateWithoutRiderComboInputSchema: z.ZodType<Prisma.HorseCreateWithoutRiderComboInput> = z.object({
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  horseRN: z.string().trim().min(1, { message: "Registered horse name is required" }),
  horseAKA: z.string().trim().optional().nullable(),
  registrationDate: z.coerce.date().optional().nullable(),
  regType: z.lazy(() => StatusSchema),
  registrationEnd: z.coerce.date().optional().nullable(),
  ownerRec: z.lazy(() => NonMemberHorseOwnerCreateNestedOneWithoutHorsesInputSchema).optional(),
  memberOwner: z.lazy(() => MemberCreateNestedOneWithoutHorseInputSchema).optional()
}).strict();

export default HorseCreateWithoutRiderComboInputSchema;
