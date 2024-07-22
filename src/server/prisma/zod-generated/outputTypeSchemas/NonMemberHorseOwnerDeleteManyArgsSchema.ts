import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NonMemberHorseOwnerWhereInputSchema } from '../inputTypeSchemas/NonMemberHorseOwnerWhereInputSchema'

export const NonMemberHorseOwnerDeleteManyArgsSchema: z.ZodType<Prisma.NonMemberHorseOwnerDeleteManyArgs> = z.object({
  where: NonMemberHorseOwnerWhereInputSchema.optional(),
}).strict() ;

export default NonMemberHorseOwnerDeleteManyArgsSchema;
