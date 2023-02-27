import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { DivisionSchema } from './DivisionSchema';

export const RiderComboMemberNameHorseNameDivisionCompoundUniqueInputSchema: z.ZodType<Prisma.RiderComboMemberNameHorseNameDivisionCompoundUniqueInput> = z.object({
  memberName: z.string(),
  horseName: z.string(),
  division: z.lazy(() => DivisionSchema),
}).strict();

export default RiderComboMemberNameHorseNameDivisionCompoundUniqueInputSchema;
