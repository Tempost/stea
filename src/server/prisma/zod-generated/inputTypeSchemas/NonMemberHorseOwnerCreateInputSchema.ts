import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PhoneTypeSchema } from './PhoneTypeSchema';
import { HorseCreateNestedManyWithoutOwnerRecInputSchema } from './HorseCreateNestedManyWithoutOwnerRecInputSchema';

export const NonMemberHorseOwnerCreateInputSchema: z.ZodType<Prisma.NonMemberHorseOwnerCreateInput> = z.object({
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  firstName: z.string().trim().min(1, { message: "First Name is required" }),
  lastName: z.string().trim().min(1, { message: "Last Name is required" }),
  fullName: z.string().trim(),
  email: z.string().trim().email({ message: "Invalid email address" }),
  phone: z.string().trim().min(1, { message: "Phone number is required" }),
  phoneType: z.lazy(() => PhoneTypeSchema).optional(),
  horses: z.lazy(() => HorseCreateNestedManyWithoutOwnerRecInputSchema).optional()
}).strict();

export default NonMemberHorseOwnerCreateInputSchema;
