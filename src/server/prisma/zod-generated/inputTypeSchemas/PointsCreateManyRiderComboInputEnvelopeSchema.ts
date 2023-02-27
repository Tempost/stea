import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { PointsCreateManyRiderComboInputSchema } from './PointsCreateManyRiderComboInputSchema';

export const PointsCreateManyRiderComboInputEnvelopeSchema: z.ZodType<Prisma.PointsCreateManyRiderComboInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PointsCreateManyRiderComboInputSchema),z.lazy(() => PointsCreateManyRiderComboInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export default PointsCreateManyRiderComboInputEnvelopeSchema;
