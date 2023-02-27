import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { PhoneTypeSchema } from './PhoneTypeSchema';
import { TypeSchema } from './TypeSchema';
import { StatusSchema } from './StatusSchema';
import { StatusTypeSchema } from './StatusTypeSchema';
import { HorseCreateNestedManyWithoutMemberOwnerInputSchema } from './HorseCreateNestedManyWithoutMemberOwnerInputSchema';

export const MemberCreateWithoutRiderComboInputSchema: z.ZodType<Prisma.MemberCreateWithoutRiderComboInput> = z.object({
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  boardMember: z.boolean().optional(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  phone: z.string(),
  phoneType: z.lazy(() => PhoneTypeSchema).optional(),
  email: z.string(),
  comments: z.string().optional().nullable(),
  confirmed: z.boolean().optional(),
  currentUSEAMember: z.boolean().optional(),
  businessName: z.string().optional().nullable(),
  membershipDate: z.coerce.date().optional().nullable(),
  memberType: z.lazy(() => TypeSchema),
  memberStatus: z.lazy(() => StatusSchema),
  memberStatusType: z.lazy(() => StatusTypeSchema),
  dateOfBirth: z.coerce.date().optional().nullable(),
  zip: z.number(),
  useaMemberID: z.number().optional().nullable(),
  Horse: z.lazy(() => HorseCreateNestedManyWithoutMemberOwnerInputSchema).optional(),
}).strict();

export default MemberCreateWithoutRiderComboInputSchema;
