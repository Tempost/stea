import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HorseCreateManyOwnerRecInputSchema } from './HorseCreateManyOwnerRecInputSchema';

export const HorseCreateManyOwnerRecInputEnvelopeSchema: z.ZodType<Prisma.HorseCreateManyOwnerRecInputEnvelope> = z.object({
  data: z.lazy(() => HorseCreateManyOwnerRecInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export default HorseCreateManyOwnerRecInputEnvelopeSchema;
