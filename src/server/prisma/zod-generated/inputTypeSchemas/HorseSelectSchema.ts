import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NonMemberHorseOwnerArgsSchema } from "../outputTypeSchemas/NonMemberHorseOwnerArgsSchema"
import { MemberArgsSchema } from "../outputTypeSchemas/MemberArgsSchema"
import { RiderComboFindManyArgsSchema } from "../outputTypeSchemas/RiderComboFindManyArgsSchema"
import { HorseCountOutputTypeArgsSchema } from "../outputTypeSchemas/HorseCountOutputTypeArgsSchema"

export const HorseSelectSchema: z.ZodType<Prisma.HorseSelect> = z.object({
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  horseRN: z.boolean().optional(),
  horseAKA: z.boolean().optional(),
  ownerRec: z.union([z.boolean(),z.lazy(() => NonMemberHorseOwnerArgsSchema)]).optional(),
  memberOwner: z.union([z.boolean(),z.lazy(() => MemberArgsSchema)]).optional(),
  memberName: z.boolean().optional(),
  registrationDate: z.boolean().optional(),
  regType: z.boolean().optional(),
  RiderCombo: z.union([z.boolean(),z.lazy(() => RiderComboFindManyArgsSchema)]).optional(),
  owner: z.boolean().optional(),
  _count: z.union([z.boolean(),z.lazy(() => HorseCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default HorseSelectSchema;
