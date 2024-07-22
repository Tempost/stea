import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { NonMemberHorseOwnerOrderByWithRelationInputSchema } from './NonMemberHorseOwnerOrderByWithRelationInputSchema';
import { MemberOrderByWithRelationInputSchema } from './MemberOrderByWithRelationInputSchema';
import { RiderComboOrderByRelationAggregateInputSchema } from './RiderComboOrderByRelationAggregateInputSchema';

export const HorseOrderByWithRelationInputSchema: z.ZodType<Prisma.HorseOrderByWithRelationInput> = z.object({
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  horseRN: z.lazy(() => SortOrderSchema).optional(),
  horseAKA: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  memberName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  registrationDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  regType: z.lazy(() => SortOrderSchema).optional(),
  owner: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  registrationEnd: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ownerRec: z.lazy(() => NonMemberHorseOwnerOrderByWithRelationInputSchema).optional(),
  memberOwner: z.lazy(() => MemberOrderByWithRelationInputSchema).optional(),
  RiderCombo: z.lazy(() => RiderComboOrderByRelationAggregateInputSchema).optional()
}).strict();

export default HorseOrderByWithRelationInputSchema;
