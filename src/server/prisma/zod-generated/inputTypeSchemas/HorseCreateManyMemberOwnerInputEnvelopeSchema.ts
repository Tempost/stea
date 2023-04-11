import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HorseCreateManyMemberOwnerInputSchema } from './HorseCreateManyMemberOwnerInputSchema';

export const HorseCreateManyMemberOwnerInputEnvelopeSchema: z.ZodType<Prisma.HorseCreateManyMemberOwnerInputEnvelope> = z.object({
  data: z.lazy(() => HorseCreateManyMemberOwnerInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export default HorseCreateManyMemberOwnerInputEnvelopeSchema;
