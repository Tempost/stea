import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { NonMemberHorseOwnerCreateWithoutHorsesInputSchema } from './NonMemberHorseOwnerCreateWithoutHorsesInputSchema';
import { NonMemberHorseOwnerUncheckedCreateWithoutHorsesInputSchema } from './NonMemberHorseOwnerUncheckedCreateWithoutHorsesInputSchema';
import { NonMemberHorseOwnerCreateOrConnectWithoutHorsesInputSchema } from './NonMemberHorseOwnerCreateOrConnectWithoutHorsesInputSchema';
import { NonMemberHorseOwnerWhereUniqueInputSchema } from './NonMemberHorseOwnerWhereUniqueInputSchema';

export const NonMemberHorseOwnerCreateNestedOneWithoutHorsesInputSchema: z.ZodType<Prisma.NonMemberHorseOwnerCreateNestedOneWithoutHorsesInput> = z.object({
  create: z.union([ z.lazy(() => NonMemberHorseOwnerCreateWithoutHorsesInputSchema),z.lazy(() => NonMemberHorseOwnerUncheckedCreateWithoutHorsesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NonMemberHorseOwnerCreateOrConnectWithoutHorsesInputSchema).optional(),
  connect: z.lazy(() => NonMemberHorseOwnerWhereUniqueInputSchema).optional()
}).strict();

export default NonMemberHorseOwnerCreateNestedOneWithoutHorsesInputSchema;
