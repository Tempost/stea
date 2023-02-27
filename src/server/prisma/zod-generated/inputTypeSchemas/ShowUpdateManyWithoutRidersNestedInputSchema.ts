import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { ShowCreateWithoutRidersInputSchema } from './ShowCreateWithoutRidersInputSchema';
import { ShowUncheckedCreateWithoutRidersInputSchema } from './ShowUncheckedCreateWithoutRidersInputSchema';
import { ShowCreateOrConnectWithoutRidersInputSchema } from './ShowCreateOrConnectWithoutRidersInputSchema';
import { ShowUpsertWithWhereUniqueWithoutRidersInputSchema } from './ShowUpsertWithWhereUniqueWithoutRidersInputSchema';
import { ShowWhereUniqueInputSchema } from './ShowWhereUniqueInputSchema';
import { ShowUpdateWithWhereUniqueWithoutRidersInputSchema } from './ShowUpdateWithWhereUniqueWithoutRidersInputSchema';
import { ShowUpdateManyWithWhereWithoutRidersInputSchema } from './ShowUpdateManyWithWhereWithoutRidersInputSchema';
import { ShowScalarWhereInputSchema } from './ShowScalarWhereInputSchema';

export const ShowUpdateManyWithoutRidersNestedInputSchema: z.ZodType<Prisma.ShowUpdateManyWithoutRidersNestedInput> = z.object({
  create: z.union([ z.lazy(() => ShowCreateWithoutRidersInputSchema),z.lazy(() => ShowCreateWithoutRidersInputSchema).array(),z.lazy(() => ShowUncheckedCreateWithoutRidersInputSchema),z.lazy(() => ShowUncheckedCreateWithoutRidersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ShowCreateOrConnectWithoutRidersInputSchema),z.lazy(() => ShowCreateOrConnectWithoutRidersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ShowUpsertWithWhereUniqueWithoutRidersInputSchema),z.lazy(() => ShowUpsertWithWhereUniqueWithoutRidersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ShowWhereUniqueInputSchema),z.lazy(() => ShowWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ShowUpdateWithWhereUniqueWithoutRidersInputSchema),z.lazy(() => ShowUpdateWithWhereUniqueWithoutRidersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ShowUpdateManyWithWhereWithoutRidersInputSchema),z.lazy(() => ShowUpdateManyWithWhereWithoutRidersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ShowScalarWhereInputSchema),z.lazy(() => ShowScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default ShowUpdateManyWithoutRidersNestedInputSchema;
