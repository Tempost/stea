import { z } from 'zod';

export const PhoneTypeSchema = z.enum(['Mobile','Home','Business']);

export type PhoneTypeType = `${z.infer<typeof PhoneTypeSchema>}`

export default PhoneTypeSchema;
