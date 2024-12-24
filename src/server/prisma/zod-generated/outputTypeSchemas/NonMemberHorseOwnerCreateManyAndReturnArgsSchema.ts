import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NonMemberHorseOwnerCreateManyInputSchema } from '../inputTypeSchemas/NonMemberHorseOwnerCreateManyInputSchema'

export const NonMemberHorseOwnerCreateManyAndReturnArgsSchema: z.ZodType<Prisma.NonMemberHorseOwnerCreateManyAndReturnArgs> = z.object({
  data: z.union([ NonMemberHorseOwnerCreateManyInputSchema,NonMemberHorseOwnerCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default NonMemberHorseOwnerCreateManyAndReturnArgsSchema;
