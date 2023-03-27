import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StatusSchema } from './StatusSchema';

export const HorseCreateManyMemberOwnerInputSchema: z.ZodType<Prisma.HorseCreateManyMemberOwnerInput> = z.object({
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  horseRN: z.string().trim().min(1, { message: "Registered horse name is required" }),
  horseAKA: z.string().trim().optional().nullable(),
  registrationDate: z.coerce.date().optional().nullable(),
  regType: z.lazy(() => StatusSchema),
  owner: z.string().optional().nullable()
}).strict();

export default HorseCreateManyMemberOwnerInputSchema;
