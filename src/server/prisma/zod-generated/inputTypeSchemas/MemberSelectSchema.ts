import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RiderComboFindManyArgsSchema } from "../outputTypeSchemas/RiderComboFindManyArgsSchema"
import { HorseFindManyArgsSchema } from "../outputTypeSchemas/HorseFindManyArgsSchema"
import { MemberCountOutputTypeArgsSchema } from "../outputTypeSchemas/MemberCountOutputTypeArgsSchema"

export const MemberSelectSchema: z.ZodType<Prisma.MemberSelect> = z.object({
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  firstName: z.boolean().optional(),
  lastName: z.boolean().optional(),
  fullName: z.boolean().optional(),
  boardMember: z.boolean().optional(),
  address: z.boolean().optional(),
  city: z.boolean().optional(),
  state: z.boolean().optional(),
  phone: z.boolean().optional(),
  phoneType: z.boolean().optional(),
  email: z.boolean().optional(),
  comments: z.boolean().optional(),
  confirmed: z.boolean().optional(),
  businessName: z.boolean().optional(),
  membershipDate: z.boolean().optional(),
  memberType: z.boolean().optional(),
  memberStatus: z.boolean().optional(),
  memberStatusType: z.boolean().optional(),
  dateOfBirth: z.boolean().optional(),
  zip: z.boolean().optional(),
  useaMemberID: z.boolean().optional(),
  RiderCombo: z.union([z.boolean(),z.lazy(() => RiderComboFindManyArgsSchema)]).optional(),
  Horse: z.union([z.boolean(),z.lazy(() => HorseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MemberCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default MemberSelectSchema;
