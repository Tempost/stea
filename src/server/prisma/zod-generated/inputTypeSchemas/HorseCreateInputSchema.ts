import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { StatusSchema } from './StatusSchema';
import { NonMemberHorseOwnerCreateNestedOneWithoutHorsesInputSchema } from './NonMemberHorseOwnerCreateNestedOneWithoutHorsesInputSchema';
import { MemberCreateNestedOneWithoutHorseInputSchema } from './MemberCreateNestedOneWithoutHorseInputSchema';
import { RiderComboCreateNestedManyWithoutHorseInputSchema } from './RiderComboCreateNestedManyWithoutHorseInputSchema';

export const HorseCreateInputSchema: z.ZodType<Prisma.HorseCreateInput> = z.object({
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  horseRN: z.string().trim().min(1, { message: "Registered horse name is required" }),
  horseAKA: z.string().trim().optional().nullable(),
  registrationDate: z.coerce.date().optional().nullable(),
  regType: z.lazy(() => StatusSchema),
  ownerRec: z.lazy(() => NonMemberHorseOwnerCreateNestedOneWithoutHorsesInputSchema).optional(),
  memberOwner: z.lazy(() => MemberCreateNestedOneWithoutHorseInputSchema).optional(),
  RiderCombo: z.lazy(() => RiderComboCreateNestedManyWithoutHorseInputSchema).optional(),
}).strict();

export default HorseCreateInputSchema;
