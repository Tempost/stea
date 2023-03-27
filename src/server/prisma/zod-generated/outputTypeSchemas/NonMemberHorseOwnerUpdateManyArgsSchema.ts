import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NonMemberHorseOwnerUpdateManyMutationInputSchema } from '../inputTypeSchemas/NonMemberHorseOwnerUpdateManyMutationInputSchema'
import { NonMemberHorseOwnerUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/NonMemberHorseOwnerUncheckedUpdateManyInputSchema'
import { NonMemberHorseOwnerWhereInputSchema } from '../inputTypeSchemas/NonMemberHorseOwnerWhereInputSchema'

export const NonMemberHorseOwnerUpdateManyArgsSchema: z.ZodType<Prisma.NonMemberHorseOwnerUpdateManyArgs> = z.object({
  data: z.union([ NonMemberHorseOwnerUpdateManyMutationInputSchema,NonMemberHorseOwnerUncheckedUpdateManyInputSchema ]),
  where: NonMemberHorseOwnerWhereInputSchema.optional(),
}).strict()

export default NonMemberHorseOwnerUpdateManyArgsSchema;
