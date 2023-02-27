import { z } from 'zod';
import { type Prisma } from '@prisma/client';
import { RiderComboMemberNameHorseNameDivisionCompoundUniqueInputSchema } from './RiderComboMemberNameHorseNameDivisionCompoundUniqueInputSchema';

export const RiderComboWhereUniqueInputSchema: z.ZodType<Prisma.RiderComboWhereUniqueInput> = z.object({
  uid: z.string().optional(),
  memberName_horseName_division: z.lazy(() => RiderComboMemberNameHorseNameDivisionCompoundUniqueInputSchema).optional(),
}).strict();

export default RiderComboWhereUniqueInputSchema;
