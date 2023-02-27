import { z } from 'zod';

export const TypeSchema = z.enum(['Individual','Family','Business']);

export type TypeType = `${z.infer<typeof TypeSchema>}`

export default TypeSchema;
