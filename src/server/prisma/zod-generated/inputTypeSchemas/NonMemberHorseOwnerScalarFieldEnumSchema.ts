import { z } from 'zod';

export const NonMemberHorseOwnerScalarFieldEnumSchema = z.enum(['createdAt','updatedAt','firstName','lastName','fullName','email','phone','phoneType']);

export default NonMemberHorseOwnerScalarFieldEnumSchema;
