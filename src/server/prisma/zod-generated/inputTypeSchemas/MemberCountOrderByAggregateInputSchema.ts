import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const MemberCountOrderByAggregateInputSchema: z.ZodType<Prisma.MemberCountOrderByAggregateInput> = z.object({
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  fullName: z.lazy(() => SortOrderSchema).optional(),
  boardMember: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  phoneType: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  comments: z.lazy(() => SortOrderSchema).optional(),
  confirmed: z.lazy(() => SortOrderSchema).optional(),
  businessName: z.lazy(() => SortOrderSchema).optional(),
  membershipDate: z.lazy(() => SortOrderSchema).optional(),
  memberType: z.lazy(() => SortOrderSchema).optional(),
  memberStatus: z.lazy(() => SortOrderSchema).optional(),
  memberStatusType: z.lazy(() => SortOrderSchema).optional(),
  dateOfBirth: z.lazy(() => SortOrderSchema).optional(),
  zip: z.lazy(() => SortOrderSchema).optional(),
  useaMemberID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default MemberCountOrderByAggregateInputSchema;
