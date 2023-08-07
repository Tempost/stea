import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RiderComboSelectSchema } from '../inputTypeSchemas/RiderComboSelectSchema';
import { RiderComboIncludeSchema } from '../inputTypeSchemas/RiderComboIncludeSchema';

export const RiderComboArgsSchema: z.ZodType<Prisma.RiderComboDefaultArgs> = z.object({
  select: z.lazy(() => RiderComboSelectSchema).optional(),
  include: z.lazy(() => RiderComboIncludeSchema).optional(),
}).strict();

export default RiderComboArgsSchema;
