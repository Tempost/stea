import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StatusTypeSchema } from './StatusTypeSchema';

export const EnumStatusTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumStatusTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => StatusTypeSchema).optional()
}).strict();

export default EnumStatusTypeFieldUpdateOperationsInputSchema;
