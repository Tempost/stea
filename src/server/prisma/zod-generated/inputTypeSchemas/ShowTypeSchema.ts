import { z } from 'zod';

export const ShowTypeSchema = z.enum(['CT','HT','Derby']);

export type ShowTypeType = `${z.infer<typeof ShowTypeSchema>}`

export default ShowTypeSchema;
