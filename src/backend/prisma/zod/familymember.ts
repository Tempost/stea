import * as z from 'zod';
import { JRSR } from '@prisma/client';
import { CompleteMember, RelatedMemberModel } from './index';

export const FamilyMemberModel = z.object({
  uid: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  name: z.string(),
  JRSR: z.nativeEnum(JRSR),
  email: z.string().nullish(),
  memberName: z.string(),
  notConnected: z.boolean(),
});

export interface CompleteFamilyMember
  extends z.infer<typeof FamilyMemberModel> {
  member: CompleteMember;
}

/**
 * RelatedFamilyMemberModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFamilyMemberModel: z.ZodSchema<CompleteFamilyMember> =
  z.lazy(() =>
    FamilyMemberModel.extend({
      member: RelatedMemberModel,
    })
  );
