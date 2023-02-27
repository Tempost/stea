import { z } from 'zod';

export const RiderComboScalarFieldEnumSchema = z.enum(['uid','createdAt','updatedAt','division','totalPoints','totalShows','completedHT','multiVenue','memberName','horseName']);

export default RiderComboScalarFieldEnumSchema;
