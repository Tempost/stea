import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ShowTypeSchema } from './ShowTypeSchema';
import { RiderComboUncheckedCreateNestedManyWithoutShowsInputSchema } from './RiderComboUncheckedCreateNestedManyWithoutShowsInputSchema';

export const ShowUncheckedCreateWithoutPointsInputSchema: z.ZodType<Prisma.ShowUncheckedCreateWithoutPointsInput> = z.object({
  uid: z.string().optional(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  showName: z.string(),
  showType: z.lazy(() => ShowTypeSchema),
  reviewed: z.boolean().optional(),
  showDate: z.coerce.date(),
  showEndDate: z.coerce.date().optional().nullable(),
  riders: z.lazy(() => RiderComboUncheckedCreateNestedManyWithoutShowsInputSchema).optional(),
  url: z.string().optional().nullable()
}).strict();

export default ShowUncheckedCreateWithoutPointsInputSchema;
