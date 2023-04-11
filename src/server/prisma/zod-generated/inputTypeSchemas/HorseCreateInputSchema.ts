import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { NonMemberHorseOwnerCreateNestedOneWithoutHorsesInputSchema } from './NonMemberHorseOwnerCreateNestedOneWithoutHorsesInputSchema';
import { MemberCreateNestedOneWithoutHorseInputSchema } from './MemberCreateNestedOneWithoutHorseInputSchema';
import { StatusSchema } from './StatusSchema';
import { RiderComboCreateNestedManyWithoutHorseInputSchema } from './RiderComboCreateNestedManyWithoutHorseInputSchema';

export const HorseCreateInputSchema: z.ZodType<Prisma.HorseCreateInput> = z.object({
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  horseRN: z.string().trim().min(1, { message: "Registered horse name is required" }),
  horseAKA: z.string().trim().optional().nullable(),
  ownerRec: z.lazy(() => NonMemberHorseOwnerCreateNestedOneWithoutHorsesInputSchema).optional(),
  memberOwner: z.lazy(() => MemberCreateNestedOneWithoutHorseInputSchema).optional(),
  registrationDate: z.coerce.date().optional().nullable(),
  regType: z.lazy(() => StatusSchema),
  RiderCombo: z.lazy(() => RiderComboCreateNestedManyWithoutHorseInputSchema).optional()
}).strict();

export default HorseCreateInputSchema;
