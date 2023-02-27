import { z } from 'zod';

export const MemberScalarFieldEnumSchema = z.enum(['createdAt','updatedAt','firstName','lastName','fullName','boardMember','address','city','state','phone','phoneType','email','comments','confirmed','currentUSEAMember','businessName','membershipDate','memberType','memberStatus','memberStatusType','dateOfBirth','zip','useaMemberID']);

export default MemberScalarFieldEnumSchema;
