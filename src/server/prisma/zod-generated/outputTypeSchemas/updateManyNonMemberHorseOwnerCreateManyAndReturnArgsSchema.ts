import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NonMemberHorseOwnerUpdateManyMutationInputSchema } from '../inputTypeSchemas/NonMemberHorseOwnerUpdateManyMutationInputSchema'
import { NonMemberHorseOwnerUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/NonMemberHorseOwnerUncheckedUpdateManyInputSchema'
import { NonMemberHorseOwnerWhereInputSchema } from '../inputTypeSchemas/NonMemberHorseOwnerWhereInputSchema'

export const updateManyNonMemberHorseOwnerCreateManyAndReturnArgsSchema: z.ZodType<Prisma.updateManyNonMemberHorseOwnerCreateManyAndReturnArgs> = z.object({
  data: z.union([ NonMemberHorseOwnerUpdateManyMutationInputSchema,NonMemberHorseOwnerUncheckedUpdateManyInputSchema ]),
  where: NonMemberHorseOwnerWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default updateManyNonMemberHorseOwnerCreateManyAndReturnArgsSchema;
