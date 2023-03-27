import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { DivisionSchema } from './DivisionSchema';
import { ShowUncheckedCreateNestedManyWithoutRidersInputSchema } from './ShowUncheckedCreateNestedManyWithoutRidersInputSchema';

export const RiderComboUncheckedCreateWithoutPointsInputSchema: z.ZodType<Prisma.RiderComboUncheckedCreateWithoutPointsInput> = z.object({
  uid: z.string().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  division: z.lazy(() => DivisionSchema),
  totalPoints: z.number().optional(),
  totalShows: z.number().optional(),
  completedHT: z.boolean().optional(),
  multiVenue: z.boolean().optional(),
  memberName: z.string(),
  horseName: z.string(),
  shows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutRidersInputSchema).optional()
}).strict();

export default RiderComboUncheckedCreateWithoutPointsInputSchema;
