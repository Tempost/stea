import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { DivisionSchema } from './DivisionSchema';

export const RiderComboCreateManyHorseInputSchema: z.ZodType<Prisma.RiderComboCreateManyHorseInput> = z.object({
  uid: z.string().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  division: z.lazy(() => DivisionSchema),
  totalPoints: z.number().optional(),
  totalShows: z.number().optional(),
  completedHT: z.boolean().optional(),
  multiVenue: z.boolean().optional(),
  memberName: z.string(),
}).strict();

export default RiderComboCreateManyHorseInputSchema;
