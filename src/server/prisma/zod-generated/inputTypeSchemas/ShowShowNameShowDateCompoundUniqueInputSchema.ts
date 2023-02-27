import { z } from 'zod';
import { type Prisma } from '@prisma/client';

export const ShowShowNameShowDateCompoundUniqueInputSchema: z.ZodType<Prisma.ShowShowNameShowDateCompoundUniqueInput> = z.object({
  showName: z.string(),
  showDate: z.coerce.date(),
}).strict();

export default ShowShowNameShowDateCompoundUniqueInputSchema;
