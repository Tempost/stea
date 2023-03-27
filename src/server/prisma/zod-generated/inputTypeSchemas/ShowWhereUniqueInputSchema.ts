import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ShowShowNameShowDateCompoundUniqueInputSchema } from './ShowShowNameShowDateCompoundUniqueInputSchema';

export const ShowWhereUniqueInputSchema: z.ZodType<Prisma.ShowWhereUniqueInput> = z.object({
  uid: z.string().optional(),
  showName_showDate: z.lazy(() => ShowShowNameShowDateCompoundUniqueInputSchema).optional()
}).strict();

export default ShowWhereUniqueInputSchema;
