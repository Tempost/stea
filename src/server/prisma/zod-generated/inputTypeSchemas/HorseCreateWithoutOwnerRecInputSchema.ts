import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StatusSchema } from './StatusSchema';
import { MemberCreateNestedOneWithoutHorseInputSchema } from './MemberCreateNestedOneWithoutHorseInputSchema';
import { RiderComboCreateNestedManyWithoutHorseInputSchema } from './RiderComboCreateNestedManyWithoutHorseInputSchema';

export const HorseCreateWithoutOwnerRecInputSchema: z.ZodType<Prisma.HorseCreateWithoutOwnerRecInput> = z.object({
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  horseRN: z.string().trim().min(1, { message: "Registered horse name is required" }),
  horseAKA: z.string().trim().optional().nullable(),
  registrationDate: z.coerce.date().optional().nullable(),
  regType: z.lazy(() => StatusSchema),
  registrationEnd: z.coerce.date().optional().nullable(),
  memberOwner: z.lazy(() => MemberCreateNestedOneWithoutHorseInputSchema).optional(),
  RiderCombo: z.lazy(() => RiderComboCreateNestedManyWithoutHorseInputSchema).optional()
}).strict();

export default HorseCreateWithoutOwnerRecInputSchema;
