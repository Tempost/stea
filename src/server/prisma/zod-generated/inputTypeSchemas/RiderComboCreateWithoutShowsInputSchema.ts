import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { DivisionSchema } from './DivisionSchema';
import { MemberCreateNestedOneWithoutRiderComboInputSchema } from './MemberCreateNestedOneWithoutRiderComboInputSchema';
import { HorseCreateNestedOneWithoutRiderComboInputSchema } from './HorseCreateNestedOneWithoutRiderComboInputSchema';
import { PointsCreateNestedManyWithoutRiderComboInputSchema } from './PointsCreateNestedManyWithoutRiderComboInputSchema';

export const RiderComboCreateWithoutShowsInputSchema: z.ZodType<Prisma.RiderComboCreateWithoutShowsInput> = z.object({
  uid: z.string().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  division: z.lazy(() => DivisionSchema),
  totalPoints: z.number().optional(),
  totalShows: z.number().optional(),
  completedHT: z.boolean().optional(),
  multiVenue: z.boolean().optional(),
  member: z.lazy(() => MemberCreateNestedOneWithoutRiderComboInputSchema),
  horse: z.lazy(() => HorseCreateNestedOneWithoutRiderComboInputSchema),
  points: z.lazy(() => PointsCreateNestedManyWithoutRiderComboInputSchema).optional()
}).strict();

export default RiderComboCreateWithoutShowsInputSchema;
