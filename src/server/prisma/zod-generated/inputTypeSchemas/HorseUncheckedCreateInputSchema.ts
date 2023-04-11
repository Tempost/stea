import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StatusSchema } from './StatusSchema';
import { RiderComboUncheckedCreateNestedManyWithoutHorseInputSchema } from './RiderComboUncheckedCreateNestedManyWithoutHorseInputSchema';

export const HorseUncheckedCreateInputSchema: z.ZodType<Prisma.HorseUncheckedCreateInput> = z.object({
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  horseRN: z.string().trim().min(1, { message: "Registered horse name is required" }),
  horseAKA: z.string().trim().optional().nullable(),
  memberName: z.string().optional().nullable(),
  registrationDate: z.coerce.date().optional().nullable(),
  regType: z.lazy(() => StatusSchema),
  RiderCombo: z.lazy(() => RiderComboUncheckedCreateNestedManyWithoutHorseInputSchema).optional(),
  owner: z.string().optional().nullable()
}).strict();

export default HorseUncheckedCreateInputSchema;
