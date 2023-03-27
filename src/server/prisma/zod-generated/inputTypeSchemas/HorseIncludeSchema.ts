import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NonMemberHorseOwnerArgsSchema } from "../outputTypeSchemas/NonMemberHorseOwnerArgsSchema"
import { MemberArgsSchema } from "../outputTypeSchemas/MemberArgsSchema"
import { RiderComboFindManyArgsSchema } from "../outputTypeSchemas/RiderComboFindManyArgsSchema"
import { HorseCountOutputTypeArgsSchema } from "../outputTypeSchemas/HorseCountOutputTypeArgsSchema"

export const HorseIncludeSchema: z.ZodType<Prisma.HorseInclude> = z.object({
  ownerRec: z.union([z.boolean(),z.lazy(() => NonMemberHorseOwnerArgsSchema)]).optional(),
  memberOwner: z.union([z.boolean(),z.lazy(() => MemberArgsSchema)]).optional(),
  RiderCombo: z.union([z.boolean(),z.lazy(() => RiderComboFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => HorseCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default HorseIncludeSchema;
