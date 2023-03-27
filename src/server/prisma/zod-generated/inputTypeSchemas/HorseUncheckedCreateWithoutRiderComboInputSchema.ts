import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StatusSchema } from './StatusSchema';

export const HorseUncheckedCreateWithoutRiderComboInputSchema: z.ZodType<Prisma.HorseUncheckedCreateWithoutRiderComboInput> = z.object({
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  horseRN: z.string(),
  horseAKA: z.string().optional().nullable(),
  memberName: z.string().optional().nullable(),
  registrationDate: z.coerce.date().optional().nullable(),
  regType: z.lazy(() => StatusSchema),
  owner: z.string().optional().nullable()
}).strict();

export default HorseUncheckedCreateWithoutRiderComboInputSchema;
