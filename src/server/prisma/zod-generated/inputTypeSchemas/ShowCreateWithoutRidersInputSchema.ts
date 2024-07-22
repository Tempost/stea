import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { ShowTypeSchema } from './ShowTypeSchema';
import { PointsCreateNestedManyWithoutShowInputSchema } from './PointsCreateNestedManyWithoutShowInputSchema';

export const ShowCreateWithoutRidersInputSchema: z.ZodType<Prisma.ShowCreateWithoutRidersInput> = z.object({
  uid: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  showName: z.string().trim().min(1, { message: "Show name is required" }),
  showType: z.lazy(() => ShowTypeSchema),
  reviewed: z.boolean().optional(),
  showDate: z.coerce.date(),
  showEndDate: z.coerce.date().optional().nullable(),
  url: z.string().trim().url({ message: "Must be a valid URL" }).optional().nullable(),
  points: z.lazy(() => PointsCreateNestedManyWithoutShowInputSchema).optional()
}).strict();

export default ShowCreateWithoutRidersInputSchema;
