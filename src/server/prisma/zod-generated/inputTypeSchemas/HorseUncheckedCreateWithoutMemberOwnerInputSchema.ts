import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StatusSchema } from './StatusSchema';
import { RiderComboUncheckedCreateNestedManyWithoutHorseInputSchema } from './RiderComboUncheckedCreateNestedManyWithoutHorseInputSchema';

export const HorseUncheckedCreateWithoutMemberOwnerInputSchema: z.ZodType<Prisma.HorseUncheckedCreateWithoutMemberOwnerInput> = z.object({
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  horseRN: z.string(),
  horseAKA: z.string().optional().nullable(),
  registrationDate: z.coerce.date().optional().nullable(),
  regType: z.lazy(() => StatusSchema),
  RiderCombo: z.lazy(() => RiderComboUncheckedCreateNestedManyWithoutHorseInputSchema).optional(),
  owner: z.string().optional().nullable()
}).strict();

export default HorseUncheckedCreateWithoutMemberOwnerInputSchema;
