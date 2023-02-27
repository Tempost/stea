import { z } from 'zod';

export const StatusSchema = z.enum(['Life','Annual']);

export type StatusType = `${z.infer<typeof StatusSchema>}`

export default StatusSchema;
