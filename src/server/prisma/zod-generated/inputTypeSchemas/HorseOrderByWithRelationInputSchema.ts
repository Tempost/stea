import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { NonMemberHorseOwnerOrderByWithRelationInputSchema } from './NonMemberHorseOwnerOrderByWithRelationInputSchema';
import { MemberOrderByWithRelationInputSchema } from './MemberOrderByWithRelationInputSchema';
import { RiderComboOrderByRelationAggregateInputSchema } from './RiderComboOrderByRelationAggregateInputSchema';

export const HorseOrderByWithRelationInputSchema: z.ZodType<Prisma.HorseOrderByWithRelationInput> = z.object({
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  horseRN: z.lazy(() => SortOrderSchema).optional(),
  horseAKA: z.lazy(() => SortOrderSchema).optional(),
  memberName: z.lazy(() => SortOrderSchema).optional(),
  registrationDate: z.lazy(() => SortOrderSchema).optional(),
  regType: z.lazy(() => SortOrderSchema).optional(),
  owner: z.lazy(() => SortOrderSchema).optional(),
  ownerRec: z.lazy(() => NonMemberHorseOwnerOrderByWithRelationInputSchema).optional(),
  memberOwner: z.lazy(() => MemberOrderByWithRelationInputSchema).optional(),
  RiderCombo: z.lazy(() => RiderComboOrderByRelationAggregateInputSchema).optional(),
}).strict();

export default HorseOrderByWithRelationInputSchema;
