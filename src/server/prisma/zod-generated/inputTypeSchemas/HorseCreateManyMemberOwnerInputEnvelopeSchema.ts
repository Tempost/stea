import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { HorseCreateManyMemberOwnerInputSchema } from './HorseCreateManyMemberOwnerInputSchema';

export const HorseCreateManyMemberOwnerInputEnvelopeSchema: z.ZodType<Prisma.HorseCreateManyMemberOwnerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => HorseCreateManyMemberOwnerInputSchema),z.lazy(() => HorseCreateManyMemberOwnerInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export default HorseCreateManyMemberOwnerInputEnvelopeSchema;
