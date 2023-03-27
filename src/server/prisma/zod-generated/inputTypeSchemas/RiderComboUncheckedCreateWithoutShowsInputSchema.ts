import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { DivisionSchema } from './DivisionSchema';
import { PointsUncheckedCreateNestedManyWithoutRiderComboInputSchema } from './PointsUncheckedCreateNestedManyWithoutRiderComboInputSchema';

export const RiderComboUncheckedCreateWithoutShowsInputSchema: z.ZodType<Prisma.RiderComboUncheckedCreateWithoutShowsInput> = z.object({
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
  points: z.lazy(() => PointsUncheckedCreateNestedManyWithoutRiderComboInputSchema).optional()
}).strict();

export default RiderComboUncheckedCreateWithoutShowsInputSchema;
