import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { HorseFindManyArgsSchema } from "../outputTypeSchemas/HorseFindManyArgsSchema"
import { NonMemberHorseOwnerCountOutputTypeArgsSchema } from "../outputTypeSchemas/NonMemberHorseOwnerCountOutputTypeArgsSchema"

export const NonMemberHorseOwnerSelectSchema: z.ZodType<Prisma.NonMemberHorseOwnerSelect> = z.object({
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  firstName: z.boolean().optional(),
  lastName: z.boolean().optional(),
  fullName: z.boolean().optional(),
  email: z.boolean().optional(),
  phone: z.boolean().optional(),
  phoneType: z.boolean().optional(),
  horses: z.union([z.boolean(),z.lazy(() => HorseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => NonMemberHorseOwnerCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default NonMemberHorseOwnerSelectSchema;
