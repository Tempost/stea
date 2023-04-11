import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PointsCreateManyRiderComboInputSchema } from './PointsCreateManyRiderComboInputSchema';

export const PointsCreateManyRiderComboInputEnvelopeSchema: z.ZodType<Prisma.PointsCreateManyRiderComboInputEnvelope> = z.object({
  data: z.lazy(() => PointsCreateManyRiderComboInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export default PointsCreateManyRiderComboInputEnvelopeSchema;
