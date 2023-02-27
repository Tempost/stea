import { z } from 'zod';

export const ShowScalarFieldEnumSchema = z.enum(['uid','createdAt','updatedAt','showName','showType','reviewed','showDate','showEndDate','url']);

export default ShowScalarFieldEnumSchema;
