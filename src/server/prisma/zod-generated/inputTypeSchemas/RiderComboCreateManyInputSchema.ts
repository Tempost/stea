import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { DivisionSchema } from './DivisionSchema';

export const RiderComboCreateManyInputSchema: z.ZodType<Prisma.RiderComboCreateManyInput> = z.object({
  uid: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  division: z.lazy(() => DivisionSchema),
  totalPoints: z.number().optional(),
  totalShows: z.number().int().optional(),
  completedHT: z.boolean().optional(),
  multiVenue: z.boolean().optional(),
  memberName: z.string().trim().min(1, { message: "Member Name is required" }),
  horseName: z.string().trim().min(1, { message: "Horse Name is required" }),
}).strict();

export default RiderComboCreateManyInputSchema;
