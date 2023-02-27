import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { RiderComboFindManyArgsSchema } from "../outputTypeSchemas/RiderComboFindManyArgsSchema"
import { HorseFindManyArgsSchema } from "../outputTypeSchemas/HorseFindManyArgsSchema"
import { MemberCountOutputTypeArgsSchema } from "../outputTypeSchemas/MemberCountOutputTypeArgsSchema"

export const MemberIncludeSchema: z.ZodType<Prisma.MemberInclude> = z.object({
  RiderCombo: z.union([z.boolean(),z.lazy(() => RiderComboFindManyArgsSchema)]).optional(),
  Horse: z.union([z.boolean(),z.lazy(() => HorseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MemberCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default MemberIncludeSchema;
