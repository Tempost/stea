import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { RiderComboOrderByRelationAggregateInputSchema } from './RiderComboOrderByRelationAggregateInputSchema';
import { HorseOrderByRelationAggregateInputSchema } from './HorseOrderByRelationAggregateInputSchema';

export const MemberOrderByWithRelationInputSchema: z.ZodType<Prisma.MemberOrderByWithRelationInput> = z.object({
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  fullName: z.lazy(() => SortOrderSchema).optional(),
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
  membershipEnd: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  memberType: z.lazy(() => SortOrderSchema).optional(),
  memberStatus: z.lazy(() => SortOrderSchema).optional(),
  memberStatusType: z.lazy(() => SortOrderSchema).optional(),
  dateOfBirth: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  zip: z.lazy(() => SortOrderSchema).optional(),
  RiderCombo: z.lazy(() => RiderComboOrderByRelationAggregateInputSchema).optional(),
  Horse: z.lazy(() => HorseOrderByRelationAggregateInputSchema).optional()
}).strict();

export default MemberOrderByWithRelationInputSchema;
