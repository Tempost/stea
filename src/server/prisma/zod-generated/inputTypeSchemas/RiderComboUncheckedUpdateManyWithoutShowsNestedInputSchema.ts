import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RiderComboCreateWithoutShowsInputSchema } from './RiderComboCreateWithoutShowsInputSchema';
import { RiderComboUncheckedCreateWithoutShowsInputSchema } from './RiderComboUncheckedCreateWithoutShowsInputSchema';
import { RiderComboCreateOrConnectWithoutShowsInputSchema } from './RiderComboCreateOrConnectWithoutShowsInputSchema';
import { RiderComboUpsertWithWhereUniqueWithoutShowsInputSchema } from './RiderComboUpsertWithWhereUniqueWithoutShowsInputSchema';
import { RiderComboWhereUniqueInputSchema } from './RiderComboWhereUniqueInputSchema';
import { RiderComboUpdateWithWhereUniqueWithoutShowsInputSchema } from './RiderComboUpdateWithWhereUniqueWithoutShowsInputSchema';
import { RiderComboUpdateManyWithWhereWithoutShowsInputSchema } from './RiderComboUpdateManyWithWhereWithoutShowsInputSchema';
import { RiderComboScalarWhereInputSchema } from './RiderComboScalarWhereInputSchema';

export const RiderComboUncheckedUpdateManyWithoutShowsNestedInputSchema: z.ZodType<Prisma.RiderComboUncheckedUpdateManyWithoutShowsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RiderComboCreateWithoutShowsInputSchema),z.lazy(() => RiderComboCreateWithoutShowsInputSchema).array(),z.lazy(() => RiderComboUncheckedCreateWithoutShowsInputSchema),z.lazy(() => RiderComboUncheckedCreateWithoutShowsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RiderComboCreateOrConnectWithoutShowsInputSchema),z.lazy(() => RiderComboCreateOrConnectWithoutShowsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RiderComboUpsertWithWhereUniqueWithoutShowsInputSchema),z.lazy(() => RiderComboUpsertWithWhereUniqueWithoutShowsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => RiderComboWhereUniqueInputSchema),z.lazy(() => RiderComboWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RiderComboWhereUniqueInputSchema),z.lazy(() => RiderComboWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RiderComboWhereUniqueInputSchema),z.lazy(() => RiderComboWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RiderComboWhereUniqueInputSchema),z.lazy(() => RiderComboWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RiderComboUpdateWithWhereUniqueWithoutShowsInputSchema),z.lazy(() => RiderComboUpdateWithWhereUniqueWithoutShowsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RiderComboUpdateManyWithWhereWithoutShowsInputSchema),z.lazy(() => RiderComboUpdateManyWithWhereWithoutShowsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RiderComboScalarWhereInputSchema),z.lazy(() => RiderComboScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default RiderComboUncheckedUpdateManyWithoutShowsNestedInputSchema;
