import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { HorseFindManyArgsSchema } from "../outputTypeSchemas/HorseFindManyArgsSchema"
import { NonMemberHorseOwnerCountOutputTypeArgsSchema } from "../outputTypeSchemas/NonMemberHorseOwnerCountOutputTypeArgsSchema"

export const NonMemberHorseOwnerIncludeSchema: z.ZodType<Prisma.NonMemberHorseOwnerInclude> = z.object({
  horses: z.union([z.boolean(),z.lazy(() => HorseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => NonMemberHorseOwnerCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default NonMemberHorseOwnerIncludeSchema;
