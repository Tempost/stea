import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RiderComboCreateWithoutShowsInputSchema } from './RiderComboCreateWithoutShowsInputSchema';
import { RiderComboUncheckedCreateWithoutShowsInputSchema } from './RiderComboUncheckedCreateWithoutShowsInputSchema';
import { RiderComboCreateOrConnectWithoutShowsInputSchema } from './RiderComboCreateOrConnectWithoutShowsInputSchema';
import { RiderComboWhereUniqueInputSchema } from './RiderComboWhereUniqueInputSchema';

export const RiderComboUncheckedCreateNestedManyWithoutShowsInputSchema: z.ZodType<Prisma.RiderComboUncheckedCreateNestedManyWithoutShowsInput> = z.object({
  create: z.union([ z.lazy(() => RiderComboCreateWithoutShowsInputSchema),z.lazy(() => RiderComboCreateWithoutShowsInputSchema).array(),z.lazy(() => RiderComboUncheckedCreateWithoutShowsInputSchema),z.lazy(() => RiderComboUncheckedCreateWithoutShowsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RiderComboCreateOrConnectWithoutShowsInputSchema),z.lazy(() => RiderComboCreateOrConnectWithoutShowsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RiderComboWhereUniqueInputSchema),z.lazy(() => RiderComboWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default RiderComboUncheckedCreateNestedManyWithoutShowsInputSchema;
