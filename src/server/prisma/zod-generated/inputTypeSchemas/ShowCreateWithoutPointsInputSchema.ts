import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ShowTypeSchema } from './ShowTypeSchema';
import { RiderComboCreateNestedManyWithoutShowsInputSchema } from './RiderComboCreateNestedManyWithoutShowsInputSchema';

export const ShowCreateWithoutPointsInputSchema: z.ZodType<Prisma.ShowCreateWithoutPointsInput> = z.object({
  uid: z.string().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  showName: z.string(),
  showType: z.lazy(() => ShowTypeSchema),
  reviewed: z.boolean().optional(),
  showDate: z.coerce.date(),
  showEndDate: z.coerce.date().optional().nullable(),
  riders: z.lazy(() => RiderComboCreateNestedManyWithoutShowsInputSchema).optional(),
  url: z.string().optional().nullable()
}).strict();

export default ShowCreateWithoutPointsInputSchema;
