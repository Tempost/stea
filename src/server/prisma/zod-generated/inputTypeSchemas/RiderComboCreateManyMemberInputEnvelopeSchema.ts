import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { RiderComboCreateManyMemberInputSchema } from './RiderComboCreateManyMemberInputSchema';

export const RiderComboCreateManyMemberInputEnvelopeSchema: z.ZodType<Prisma.RiderComboCreateManyMemberInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RiderComboCreateManyMemberInputSchema),z.lazy(() => RiderComboCreateManyMemberInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export default RiderComboCreateManyMemberInputEnvelopeSchema;
