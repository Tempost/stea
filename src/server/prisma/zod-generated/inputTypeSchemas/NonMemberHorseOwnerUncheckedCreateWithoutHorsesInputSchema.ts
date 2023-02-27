import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { PhoneTypeSchema } from './PhoneTypeSchema';

export const NonMemberHorseOwnerUncheckedCreateWithoutHorsesInputSchema: z.ZodType<Prisma.NonMemberHorseOwnerUncheckedCreateWithoutHorsesInput> = z.object({
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  phoneType: z.lazy(() => PhoneTypeSchema).optional(),
}).strict();

export default NonMemberHorseOwnerUncheckedCreateWithoutHorsesInputSchema;
