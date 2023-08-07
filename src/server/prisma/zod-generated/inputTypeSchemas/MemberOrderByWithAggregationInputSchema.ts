import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { MemberCountOrderByAggregateInputSchema } from './MemberCountOrderByAggregateInputSchema';
import { MemberAvgOrderByAggregateInputSchema } from './MemberAvgOrderByAggregateInputSchema';
import { MemberMaxOrderByAggregateInputSchema } from './MemberMaxOrderByAggregateInputSchema';
import { MemberMinOrderByAggregateInputSchema } from './MemberMinOrderByAggregateInputSchema';
import { MemberSumOrderByAggregateInputSchema } from './MemberSumOrderByAggregateInputSchema';

export const MemberOrderByWithAggregationInputSchema: z.ZodType<Prisma.MemberOrderByWithAggregationInput> = z.object({
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  comments: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  confirmed: z.lazy(() => SortOrderSchema).optional(),
  businessName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  membershipDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  memberType: z.lazy(() => SortOrderSchema).optional(),
  memberStatus: z.lazy(() => SortOrderSchema).optional(),
  memberStatusType: z.lazy(() => SortOrderSchema).optional(),
  dateOfBirth: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  zip: z.lazy(() => SortOrderSchema).optional(),
  useaMemberID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => MemberCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MemberAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MemberMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MemberMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MemberSumOrderByAggregateInputSchema).optional()
}).strict();

export default MemberOrderByWithAggregationInputSchema;
