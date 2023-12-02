import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { DivisionSchema } from './DivisionSchema';

export const RiderComboMemberNameHorseNameDivisionShowYearCompoundUniqueInputSchema: z.ZodType<Prisma.RiderComboMemberNameHorseNameDivisionShowYearCompoundUniqueInput> = z.object({
  memberName: z.string(),
  horseName: z.string(),
  division: z.lazy(() => DivisionSchema),
  showYear: z.number()
}).strict();

export default RiderComboMemberNameHorseNameDivisionShowYearCompoundUniqueInputSchema;
