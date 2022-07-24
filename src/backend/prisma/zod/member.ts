import * as z from 'zod';
import { PhoneType, Type, Status, JRSR } from '@prisma/client';
import {
  CompletePayment,
  RelatedPaymentModel,
  CompleteFamilyMember,
  RelatedFamilyMemberModel,
  CompleteShow,
  RelatedShowModel,
  CompleteRiderCombo,
  RelatedRiderComboModel,
} from './index';

export const MemberModel = z.object({
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  boardMember: z.boolean(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  phone: z.string(),
  phoneType: z.nativeEnum(PhoneType),
  email: z.string(),
  comments: z.string().nullish(),
  confirmed: z.boolean(),
  currentUSEAMember: z.boolean(),
  membershipDate: z.date().nullish(),
  memberType: z.nativeEnum(Type),
  memberStatus: z.nativeEnum(Status),
  JRSR: z.nativeEnum(JRSR),
  dateOfBirth: z.date().nullish(),
  zip: z.number().int(),
  useaMemberID: z.number().int().nullish(),
});

export interface CompleteMember extends z.infer<typeof MemberModel> {
  payment?: CompletePayment | null;
  family: CompleteFamilyMember[];
  shows: CompleteShow[];
  RiderCombo: CompleteRiderCombo[];
}

/**
 * RelatedMemberModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMemberModel: z.ZodSchema<CompleteMember> = z.lazy(() =>
  MemberModel.extend({
    payment: RelatedPaymentModel.nullish(),
    family: RelatedFamilyMemberModel.array(),
    shows: RelatedShowModel.array(),
    RiderCombo: RelatedRiderComboModel.array(),
  })
);
