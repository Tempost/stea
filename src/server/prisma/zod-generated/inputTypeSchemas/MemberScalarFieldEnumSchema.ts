import { z } from 'zod';

export const MemberScalarFieldEnumSchema = z.enum(['createdAt','updatedAt','firstName','lastName','fullName','address','city','state','phone','phoneType','email','comments','confirmed','businessName','membershipDate','membershipEnd','memberType','memberStatus','memberStatusType','dateOfBirth','zip']);

export default MemberScalarFieldEnumSchema;
