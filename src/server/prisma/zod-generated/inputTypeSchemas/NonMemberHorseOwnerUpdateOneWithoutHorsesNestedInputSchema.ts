import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { NonMemberHorseOwnerCreateWithoutHorsesInputSchema } from './NonMemberHorseOwnerCreateWithoutHorsesInputSchema';
import { NonMemberHorseOwnerUncheckedCreateWithoutHorsesInputSchema } from './NonMemberHorseOwnerUncheckedCreateWithoutHorsesInputSchema';
import { NonMemberHorseOwnerCreateOrConnectWithoutHorsesInputSchema } from './NonMemberHorseOwnerCreateOrConnectWithoutHorsesInputSchema';
import { NonMemberHorseOwnerUpsertWithoutHorsesInputSchema } from './NonMemberHorseOwnerUpsertWithoutHorsesInputSchema';
import { NonMemberHorseOwnerWhereInputSchema } from './NonMemberHorseOwnerWhereInputSchema';
import { NonMemberHorseOwnerWhereUniqueInputSchema } from './NonMemberHorseOwnerWhereUniqueInputSchema';
import { NonMemberHorseOwnerUpdateToOneWithWhereWithoutHorsesInputSchema } from './NonMemberHorseOwnerUpdateToOneWithWhereWithoutHorsesInputSchema';
import { NonMemberHorseOwnerUpdateWithoutHorsesInputSchema } from './NonMemberHorseOwnerUpdateWithoutHorsesInputSchema';
import { NonMemberHorseOwnerUncheckedUpdateWithoutHorsesInputSchema } from './NonMemberHorseOwnerUncheckedUpdateWithoutHorsesInputSchema';

export const NonMemberHorseOwnerUpdateOneWithoutHorsesNestedInputSchema: z.ZodType<Prisma.NonMemberHorseOwnerUpdateOneWithoutHorsesNestedInput> = z.object({
  create: z.union([ z.lazy(() => NonMemberHorseOwnerCreateWithoutHorsesInputSchema),z.lazy(() => NonMemberHorseOwnerUncheckedCreateWithoutHorsesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => NonMemberHorseOwnerCreateOrConnectWithoutHorsesInputSchema).optional(),
  upsert: z.lazy(() => NonMemberHorseOwnerUpsertWithoutHorsesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => NonMemberHorseOwnerWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => NonMemberHorseOwnerWhereInputSchema) ]).optional(),
  connect: z.lazy(() => NonMemberHorseOwnerWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => NonMemberHorseOwnerUpdateToOneWithWhereWithoutHorsesInputSchema),z.lazy(() => NonMemberHorseOwnerUpdateWithoutHorsesInputSchema),z.lazy(() => NonMemberHorseOwnerUncheckedUpdateWithoutHorsesInputSchema) ]).optional(),
}).strict();

export default NonMemberHorseOwnerUpdateOneWithoutHorsesNestedInputSchema;
