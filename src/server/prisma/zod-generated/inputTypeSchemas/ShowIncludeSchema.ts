import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { RiderComboFindManyArgsSchema } from "../outputTypeSchemas/RiderComboFindManyArgsSchema"
import { PointsFindManyArgsSchema } from "../outputTypeSchemas/PointsFindManyArgsSchema"
import { ShowCountOutputTypeArgsSchema } from "../outputTypeSchemas/ShowCountOutputTypeArgsSchema"

export const ShowIncludeSchema: z.ZodType<Prisma.ShowInclude> = z.object({
  riders: z.union([z.boolean(),z.lazy(() => RiderComboFindManyArgsSchema)]).optional(),
  points: z.union([z.boolean(),z.lazy(() => PointsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ShowCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default ShowIncludeSchema;
