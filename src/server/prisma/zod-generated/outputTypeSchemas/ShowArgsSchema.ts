import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { ShowSelectSchema } from '../inputTypeSchemas/ShowSelectSchema';
import { ShowIncludeSchema } from '../inputTypeSchemas/ShowIncludeSchema';

export const ShowArgsSchema: z.ZodType<Prisma.ShowArgs> = z.object({
  select: z.lazy(() => ShowSelectSchema).optional(),
  include: z.lazy(() => ShowIncludeSchema).optional(),
}).strict();

export default ShowArgsSchema;
