import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { DivisionSchema } from './DivisionSchema';
import { PointsUncheckedCreateNestedManyWithoutRiderComboInputSchema } from './PointsUncheckedCreateNestedManyWithoutRiderComboInputSchema';
import { ShowUncheckedCreateNestedManyWithoutRidersInputSchema } from './ShowUncheckedCreateNestedManyWithoutRidersInputSchema';

export const RiderComboUncheckedCreateWithoutMemberInputSchema: z.ZodType<Prisma.RiderComboUncheckedCreateWithoutMemberInput> = z.object({
  uid: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  division: z.lazy(() => DivisionSchema),
  totalPoints: z.number().optional(),
  totalShows: z.number().int().optional(),
  completedHT: z.boolean().optional(),
  multiVenue: z.boolean().optional(),
  horseName: z.string().trim().min(1, { message: "Horse Name is required" }),
  showYear: z.number().int().optional().nullable(),
  points: z.lazy(() => PointsUncheckedCreateNestedManyWithoutRiderComboInputSchema).optional(),
  shows: z.lazy(() => ShowUncheckedCreateNestedManyWithoutRidersInputSchema).optional()
}).strict();

export default RiderComboUncheckedCreateWithoutMemberInputSchema;
