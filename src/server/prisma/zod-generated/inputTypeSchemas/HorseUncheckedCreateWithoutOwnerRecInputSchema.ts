import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { StatusSchema } from './StatusSchema';
import { RiderComboUncheckedCreateNestedManyWithoutHorseInputSchema } from './RiderComboUncheckedCreateNestedManyWithoutHorseInputSchema';

export const HorseUncheckedCreateWithoutOwnerRecInputSchema: z.ZodType<Prisma.HorseUncheckedCreateWithoutOwnerRecInput> = z.object({
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  horseRN: z.string(),
  horseAKA: z.string().optional().nullable(),
  memberName: z.string().optional().nullable(),
  registrationDate: z.coerce.date().optional().nullable(),
  regType: z.lazy(() => StatusSchema),
  RiderCombo: z.lazy(() => RiderComboUncheckedCreateNestedManyWithoutHorseInputSchema).optional(),
}).strict();

export default HorseUncheckedCreateWithoutOwnerRecInputSchema;
