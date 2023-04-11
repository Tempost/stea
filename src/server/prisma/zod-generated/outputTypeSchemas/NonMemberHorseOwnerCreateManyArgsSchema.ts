import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NonMemberHorseOwnerCreateManyInputSchema } from '../inputTypeSchemas/NonMemberHorseOwnerCreateManyInputSchema'

export const NonMemberHorseOwnerCreateManyArgsSchema: z.ZodType<Prisma.NonMemberHorseOwnerCreateManyArgs> = z.object({
  data: NonMemberHorseOwnerCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default NonMemberHorseOwnerCreateManyArgsSchema;
