import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DivisionSchema } from './DivisionSchema';

export const EnumDivisionFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumDivisionFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => DivisionSchema).optional()
}).strict();

export default EnumDivisionFieldUpdateOperationsInputSchema;
