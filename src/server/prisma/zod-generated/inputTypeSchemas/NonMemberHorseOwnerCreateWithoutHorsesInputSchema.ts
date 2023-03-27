import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PhoneTypeSchema } from './PhoneTypeSchema';

export const NonMemberHorseOwnerCreateWithoutHorsesInputSchema: z.ZodType<Prisma.NonMemberHorseOwnerCreateWithoutHorsesInput> = z.object({
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  phoneType: z.lazy(() => PhoneTypeSchema).optional()
}).strict();

export default NonMemberHorseOwnerCreateWithoutHorsesInputSchema;
