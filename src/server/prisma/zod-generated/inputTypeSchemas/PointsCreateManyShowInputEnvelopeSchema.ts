import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PointsCreateManyShowInputSchema } from './PointsCreateManyShowInputSchema';

export const PointsCreateManyShowInputEnvelopeSchema: z.ZodType<Prisma.PointsCreateManyShowInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PointsCreateManyShowInputSchema),z.lazy(() => PointsCreateManyShowInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default PointsCreateManyShowInputEnvelopeSchema;
