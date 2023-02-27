import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { RiderComboCreateManyHorseInputSchema } from './RiderComboCreateManyHorseInputSchema';

export const RiderComboCreateManyHorseInputEnvelopeSchema: z.ZodType<Prisma.RiderComboCreateManyHorseInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RiderComboCreateManyHorseInputSchema),z.lazy(() => RiderComboCreateManyHorseInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export default RiderComboCreateManyHorseInputEnvelopeSchema;
