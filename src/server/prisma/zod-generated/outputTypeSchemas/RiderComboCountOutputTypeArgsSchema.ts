import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RiderComboCountOutputTypeSelectSchema } from './RiderComboCountOutputTypeSelectSchema';

export const RiderComboCountOutputTypeArgsSchema: z.ZodType<Prisma.RiderComboCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RiderComboCountOutputTypeSelectSchema).nullish(),
}).strict();

export default RiderComboCountOutputTypeSelectSchema;
