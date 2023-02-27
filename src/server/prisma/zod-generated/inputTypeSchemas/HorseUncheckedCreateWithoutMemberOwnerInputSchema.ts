import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { StatusSchema } from './StatusSchema';
import { RiderComboUncheckedCreateNestedManyWithoutHorseInputSchema } from './RiderComboUncheckedCreateNestedManyWithoutHorseInputSchema';

export const HorseUncheckedCreateWithoutMemberOwnerInputSchema: z.ZodType<Prisma.HorseUncheckedCreateWithoutMemberOwnerInput> = z.object({
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  horseRN: z.string(),
  horseAKA: z.string().optional().nullable(),
  registrationDate: z.coerce.date().optional().nullable(),
  regType: z.lazy(() => StatusSchema),
  owner: z.string().optional().nullable(),
  RiderCombo: z.lazy(() => RiderComboUncheckedCreateNestedManyWithoutHorseInputSchema).optional(),
}).strict();

export default HorseUncheckedCreateWithoutMemberOwnerInputSchema;
