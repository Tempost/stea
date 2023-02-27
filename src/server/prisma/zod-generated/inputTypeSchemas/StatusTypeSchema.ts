import { z } from 'zod';

export const StatusTypeSchema = z.enum(['AdultAmateur','Professional','Junior']);

export type StatusTypeType = `${z.infer<typeof StatusTypeSchema>}`

export default StatusTypeSchema;
