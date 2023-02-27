import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { MemberCreateWithoutHorseInputSchema } from './MemberCreateWithoutHorseInputSchema';
import { MemberUncheckedCreateWithoutHorseInputSchema } from './MemberUncheckedCreateWithoutHorseInputSchema';
import { MemberCreateOrConnectWithoutHorseInputSchema } from './MemberCreateOrConnectWithoutHorseInputSchema';
import { MemberUpsertWithoutHorseInputSchema } from './MemberUpsertWithoutHorseInputSchema';
import { MemberWhereUniqueInputSchema } from './MemberWhereUniqueInputSchema';
import { MemberUpdateWithoutHorseInputSchema } from './MemberUpdateWithoutHorseInputSchema';
import { MemberUncheckedUpdateWithoutHorseInputSchema } from './MemberUncheckedUpdateWithoutHorseInputSchema';

export const MemberUpdateOneWithoutHorseNestedInputSchema: z.ZodType<Prisma.MemberUpdateOneWithoutHorseNestedInput> = z.object({
  create: z.union([ z.lazy(() => MemberCreateWithoutHorseInputSchema),z.lazy(() => MemberUncheckedCreateWithoutHorseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MemberCreateOrConnectWithoutHorseInputSchema).optional(),
  upsert: z.lazy(() => MemberUpsertWithoutHorseInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => MemberWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MemberUpdateWithoutHorseInputSchema),z.lazy(() => MemberUncheckedUpdateWithoutHorseInputSchema) ]).optional(),
}).strict();

export default MemberUpdateOneWithoutHorseNestedInputSchema;
