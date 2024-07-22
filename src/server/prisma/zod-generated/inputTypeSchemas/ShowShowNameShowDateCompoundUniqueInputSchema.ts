import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const ShowShowNameShowDateCompoundUniqueInputSchema: z.ZodType<Prisma.ShowShowNameShowDateCompoundUniqueInput> = z.object({
  showName: z.string(),
  showDate: z.coerce.date()
}).strict();

export default ShowShowNameShowDateCompoundUniqueInputSchema;
