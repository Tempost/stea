import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MemberArgsSchema } from "../outputTypeSchemas/MemberArgsSchema"
import { HorseArgsSchema } from "../outputTypeSchemas/HorseArgsSchema"
import { PointsFindManyArgsSchema } from "../outputTypeSchemas/PointsFindManyArgsSchema"
import { ShowFindManyArgsSchema } from "../outputTypeSchemas/ShowFindManyArgsSchema"
import { RiderComboCountOutputTypeArgsSchema } from "../outputTypeSchemas/RiderComboCountOutputTypeArgsSchema"

export const RiderComboIncludeSchema: z.ZodType<Prisma.RiderComboInclude> = z.object({
  member: z.union([z.boolean(),z.lazy(() => MemberArgsSchema)]).optional(),
  horse: z.union([z.boolean(),z.lazy(() => HorseArgsSchema)]).optional(),
  points: z.union([z.boolean(),z.lazy(() => PointsFindManyArgsSchema)]).optional(),
  shows: z.union([z.boolean(),z.lazy(() => ShowFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RiderComboCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default RiderComboIncludeSchema;
