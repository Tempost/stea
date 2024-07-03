import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PhoneTypeSchema } from './PhoneTypeSchema';
import { TypeSchema } from './TypeSchema';
import { StatusSchema } from './StatusSchema';
import { StatusTypeSchema } from './StatusTypeSchema';
import { RiderComboUncheckedCreateNestedManyWithoutMemberInputSchema } from './RiderComboUncheckedCreateNestedManyWithoutMemberInputSchema';

export const MemberUncheckedCreateWithoutHorseInputSchema: z.ZodType<Prisma.MemberUncheckedCreateWithoutHorseInput> = z.object({
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  firstName: z.string().trim().min(1, { message: "First Name is required" }),
  lastName: z.string().trim().min(1, { message: "Last Name is required" }),
  fullName: z.string().trim(),
  address: z.string().trim().min(1, { message: "Address is required" }),
  city: z.string().trim().min(1, { message: "City is required" }),
  state: z.string().trim().min(1, { message: "State is required" }),
  phone: z.string().trim().min(1, { message: "Phone Number is required" }),
  phoneType: z.lazy(() => PhoneTypeSchema).optional(),
  email: z.string().trim().email({ message: "Invalid email address" }),
  comments: z.string().optional().nullable(),
  confirmed: z.boolean().optional(),
  businessName: z.string().trim().min(1, { message: "Business name is required" }).optional().nullable(),
  membershipDate: z.coerce.date().optional().nullable(),
  membershipEnd: z.coerce.date().optional().nullable(),
  memberType: z.lazy(() => TypeSchema),
  memberStatus: z.lazy(() => StatusSchema),
  memberStatusType: z.lazy(() => StatusTypeSchema),
  dateOfBirth: z.coerce.date().optional().nullable(),
  zip: z.number().int({message: "Zipcode is required"}),
  RiderCombo: z.lazy(() => RiderComboUncheckedCreateNestedManyWithoutMemberInputSchema).optional()
}).strict();

export default MemberUncheckedCreateWithoutHorseInputSchema;
