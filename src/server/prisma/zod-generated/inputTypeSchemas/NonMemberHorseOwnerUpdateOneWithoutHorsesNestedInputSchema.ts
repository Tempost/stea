import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { NonMemberHorseOwnerCreateWithoutHorsesInputSchema } from './NonMemberHorseOwnerCreateWithoutHorsesInputSchema';
import { NonMemberHorseOwnerUncheckedCreateWithoutHorsesInputSchema } from './NonMemberHorseOwnerUncheckedCreateWithoutHorsesInputSchema';
import { NonMemberHorseOwnerCreateOrConnectWithoutHorsesInputSchema } from './NonMemberHorseOwnerCreateOrConnectWithoutHorsesInputSchema';
import { NonMemberHorseOwnerUpsertWithoutHorsesInputSchema } from './NonMemberHorseOwnerUpsertWithoutHorsesInputSchema';
import { NonMemberHorseOwnerWhereUniqueInputSchema } from './NonMemberHorseOwnerWhereUniqueInputSchema';
import { NonMemberHorseOwnerUpdateWithoutHorsesInputSchema } from './NonMemberHorseOwnerUpdateWithoutHorsesInputSchema';
import { NonMemberHorseOwnerUncheckedUpdateWithoutHorsesInputSchema } from './NonMemberHorseOwnerUncheckedUpdateWithoutHorsesInputSchema';

export const NonMemberHorseOwnerUpdateOneWithoutHorsesNestedInputSchema: z.ZodType<Prisma.NonMemberHorseOwnerUpdateOneWithoutHorsesNestedInput> = z.object({
  create: z.union([ z.lazy(() => NonMemberHorseOwnerCreateWithoutHorsesInputSchema),z.lazy(() => NonMemberHorseOwnerUncheckedCreateWithoutHorsesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NonMemberHorseOwnerCreateOrConnectWithoutHorsesInputSchema).optional(),
  upsert: z.lazy(() => NonMemberHorseOwnerUpsertWithoutHorsesInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => NonMemberHorseOwnerWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => NonMemberHorseOwnerUpdateWithoutHorsesInputSchema),z.lazy(() => NonMemberHorseOwnerUncheckedUpdateWithoutHorsesInputSchema) ]).optional(),
}).strict();

export default NonMemberHorseOwnerUpdateOneWithoutHorsesNestedInputSchema;
