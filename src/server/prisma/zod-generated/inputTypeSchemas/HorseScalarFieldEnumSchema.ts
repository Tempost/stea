import { z } from 'zod';

export const HorseScalarFieldEnumSchema = z.enum(['createdAt','updatedAt','horseRN','horseAKA','memberName','registrationDate','regType','owner','registrationEnd']);

export default HorseScalarFieldEnumSchema;
