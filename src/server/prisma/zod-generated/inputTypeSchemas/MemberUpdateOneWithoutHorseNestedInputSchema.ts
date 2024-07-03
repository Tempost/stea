import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MemberCreateWithoutHorseInputSchema } from './MemberCreateWithoutHorseInputSchema';
import { MemberUncheckedCreateWithoutHorseInputSchema } from './MemberUncheckedCreateWithoutHorseInputSchema';
import { MemberCreateOrConnectWithoutHorseInputSchema } from './MemberCreateOrConnectWithoutHorseInputSchema';
import { MemberUpsertWithoutHorseInputSchema } from './MemberUpsertWithoutHorseInputSchema';
import { MemberWhereInputSchema } from './MemberWhereInputSchema';
import { MemberWhereUniqueInputSchema } from './MemberWhereUniqueInputSchema';
import { MemberUpdateToOneWithWhereWithoutHorseInputSchema } from './MemberUpdateToOneWithWhereWithoutHorseInputSchema';
import { MemberUpdateWithoutHorseInputSchema } from './MemberUpdateWithoutHorseInputSchema';
import { MemberUncheckedUpdateWithoutHorseInputSchema } from './MemberUncheckedUpdateWithoutHorseInputSchema';

export const MemberUpdateOneWithoutHorseNestedInputSchema: z.ZodType<Prisma.MemberUpdateOneWithoutHorseNestedInput> = z.object({
  create: z.union([ z.lazy(() => MemberCreateWithoutHorseInputSchema),z.lazy(() => MemberUncheckedCreateWithoutHorseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MemberCreateOrConnectWithoutHorseInputSchema).optional(),
  upsert: z.lazy(() => MemberUpsertWithoutHorseInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => MemberWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => MemberWhereInputSchema) ]).optional(),
  connect: z.lazy(() => MemberWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MemberUpdateToOneWithWhereWithoutHorseInputSchema),z.lazy(() => MemberUpdateWithoutHorseInputSchema),z.lazy(() => MemberUncheckedUpdateWithoutHorseInputSchema) ]).optional(),
}).strict();

export default MemberUpdateOneWithoutHorseNestedInputSchema;
