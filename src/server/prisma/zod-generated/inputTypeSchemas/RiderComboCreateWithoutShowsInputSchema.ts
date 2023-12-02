import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { DivisionSchema } from './DivisionSchema';
import { MemberCreateNestedOneWithoutRiderComboInputSchema } from './MemberCreateNestedOneWithoutRiderComboInputSchema';
import { HorseCreateNestedOneWithoutRiderComboInputSchema } from './HorseCreateNestedOneWithoutRiderComboInputSchema';
import { PointsCreateNestedManyWithoutRiderComboInputSchema } from './PointsCreateNestedManyWithoutRiderComboInputSchema';

export const RiderComboCreateWithoutShowsInputSchema: z.ZodType<Prisma.RiderComboCreateWithoutShowsInput> = z.object({
  uid: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  division: z.lazy(() => DivisionSchema),
  totalPoints: z.number().optional(),
  totalShows: z.number().int().optional(),
  completedHT: z.boolean().optional(),
  multiVenue: z.boolean().optional(),
  showYear: z.number().int().optional().nullable(),
  member: z.lazy(() => MemberCreateNestedOneWithoutRiderComboInputSchema),
  horse: z.lazy(() => HorseCreateNestedOneWithoutRiderComboInputSchema),
  points: z.lazy(() => PointsCreateNestedManyWithoutRiderComboInputSchema).optional()
}).strict();

export default RiderComboCreateWithoutShowsInputSchema;
