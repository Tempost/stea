import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MemberCreateNestedOneWithoutHorseInputSchema } from './MemberCreateNestedOneWithoutHorseInputSchema';
import { StatusSchema } from './StatusSchema';
import { RiderComboCreateNestedManyWithoutHorseInputSchema } from './RiderComboCreateNestedManyWithoutHorseInputSchema';

export const HorseCreateWithoutOwnerRecInputSchema: z.ZodType<Prisma.HorseCreateWithoutOwnerRecInput> = z.object({
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  horseRN: z.string(),
  horseAKA: z.string().optional().nullable(),
  memberOwner: z.lazy(() => MemberCreateNestedOneWithoutHorseInputSchema).optional(),
  registrationDate: z.coerce.date().optional().nullable(),
  regType: z.lazy(() => StatusSchema),
  RiderCombo: z.lazy(() => RiderComboCreateNestedManyWithoutHorseInputSchema).optional()
}).strict();

export default HorseCreateWithoutOwnerRecInputSchema;
