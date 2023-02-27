import { z } from 'zod';

export const DivisionSchema = z.enum(['Prelim','Train','Novice','BGN','GOLD','GAG']);

export type DivisionType = `${z.infer<typeof DivisionSchema>}`

export default DivisionSchema;
