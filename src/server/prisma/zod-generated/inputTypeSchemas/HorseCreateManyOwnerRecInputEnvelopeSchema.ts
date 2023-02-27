import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { HorseCreateManyOwnerRecInputSchema } from './HorseCreateManyOwnerRecInputSchema';

export const HorseCreateManyOwnerRecInputEnvelopeSchema: z.ZodType<Prisma.HorseCreateManyOwnerRecInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => HorseCreateManyOwnerRecInputSchema),z.lazy(() => HorseCreateManyOwnerRecInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export default HorseCreateManyOwnerRecInputEnvelopeSchema;
