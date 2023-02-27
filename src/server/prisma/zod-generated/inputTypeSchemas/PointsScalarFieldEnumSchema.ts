import { z } from 'zod';

export const PointsScalarFieldEnumSchema = z.enum(['uid','riderUid','points','place','showUid']);

export default PointsScalarFieldEnumSchema;
