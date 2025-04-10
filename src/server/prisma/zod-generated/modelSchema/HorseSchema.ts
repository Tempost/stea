import { z } from 'zod';
import { StatusSchema } from '../inputTypeSchemas/StatusSchema'
import { NonMemberHorseOwnerWithRelationsSchema, NonMemberHorseOwnerPartialWithRelationsSchema, NonMemberHorseOwnerOptionalDefaultsWithRelationsSchema } from './NonMemberHorseOwnerSchema'
import type { NonMemberHorseOwnerWithRelations, NonMemberHorseOwnerPartialWithRelations, NonMemberHorseOwnerOptionalDefaultsWithRelations } from './NonMemberHorseOwnerSchema'
import { MemberWithRelationsSchema, MemberPartialWithRelationsSchema, MemberOptionalDefaultsWithRelationsSchema } from './MemberSchema'
import type { MemberWithRelations, MemberPartialWithRelations, MemberOptionalDefaultsWithRelations } from './MemberSchema'
import { RiderComboWithRelationsSchema, RiderComboPartialWithRelationsSchema, RiderComboOptionalDefaultsWithRelationsSchema } from './RiderComboSchema'
import type { RiderComboWithRelations, RiderComboPartialWithRelations, RiderComboOptionalDefaultsWithRelations } from './RiderComboSchema'

/////////////////////////////////////////
// HORSE SCHEMA
/////////////////////////////////////////

export const HorseSchema = z.object({
  regType: StatusSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  /**
   * Registered name of the horse, unique
   */
  horseRN: z.string().trim().min(1, { message: "Registered horse name is required" }),
  /**
   * Barn name of the horse
   */
  horseAKA: z.string().trim().nullable(),
  memberName: z.string().nullable(),
  registrationDate: z.coerce.date(),
  owner: z.string().nullable(),
  registrationEnd: z.coerce.date().nullable(),
})

export type Horse = z.infer<typeof HorseSchema>

/////////////////////////////////////////
// HORSE PARTIAL SCHEMA
/////////////////////////////////////////

export const HorsePartialSchema = HorseSchema.partial()

export type HorsePartial = z.infer<typeof HorsePartialSchema>

/////////////////////////////////////////
// HORSE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const HorseOptionalDefaultsSchema = HorseSchema.merge(z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  registrationDate: z.coerce.date().optional(),
}))

export type HorseOptionalDefaults = z.infer<typeof HorseOptionalDefaultsSchema>

/////////////////////////////////////////
// HORSE RELATION SCHEMA
/////////////////////////////////////////

export type HorseRelations = {
  ownerRec?: NonMemberHorseOwnerWithRelations | null;
  memberOwner?: MemberWithRelations | null;
  RiderCombo: RiderComboWithRelations[];
};

export type HorseWithRelations = z.infer<typeof HorseSchema> & HorseRelations

export const HorseWithRelationsSchema: z.ZodType<HorseWithRelations> = HorseSchema.merge(z.object({
  ownerRec: z.lazy(() => NonMemberHorseOwnerWithRelationsSchema).nullable(),
  memberOwner: z.lazy(() => MemberWithRelationsSchema).nullable(),
  RiderCombo: z.lazy(() => RiderComboWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// HORSE OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type HorseOptionalDefaultsRelations = {
  ownerRec?: NonMemberHorseOwnerOptionalDefaultsWithRelations | null;
  memberOwner?: MemberOptionalDefaultsWithRelations | null;
  RiderCombo: RiderComboOptionalDefaultsWithRelations[];
};

export type HorseOptionalDefaultsWithRelations = z.infer<typeof HorseOptionalDefaultsSchema> & HorseOptionalDefaultsRelations

export const HorseOptionalDefaultsWithRelationsSchema: z.ZodType<HorseOptionalDefaultsWithRelations> = HorseOptionalDefaultsSchema.merge(z.object({
  ownerRec: z.lazy(() => NonMemberHorseOwnerOptionalDefaultsWithRelationsSchema).nullable(),
  memberOwner: z.lazy(() => MemberOptionalDefaultsWithRelationsSchema).nullable(),
  RiderCombo: z.lazy(() => RiderComboOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// HORSE PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type HorsePartialRelations = {
  ownerRec?: NonMemberHorseOwnerPartialWithRelations | null;
  memberOwner?: MemberPartialWithRelations | null;
  RiderCombo?: RiderComboPartialWithRelations[];
};

export type HorsePartialWithRelations = z.infer<typeof HorsePartialSchema> & HorsePartialRelations

export const HorsePartialWithRelationsSchema: z.ZodType<HorsePartialWithRelations> = HorsePartialSchema.merge(z.object({
  ownerRec: z.lazy(() => NonMemberHorseOwnerPartialWithRelationsSchema).nullable(),
  memberOwner: z.lazy(() => MemberPartialWithRelationsSchema).nullable(),
  RiderCombo: z.lazy(() => RiderComboPartialWithRelationsSchema).array(),
})).partial()

export type HorseOptionalDefaultsWithPartialRelations = z.infer<typeof HorseOptionalDefaultsSchema> & HorsePartialRelations

export const HorseOptionalDefaultsWithPartialRelationsSchema: z.ZodType<HorseOptionalDefaultsWithPartialRelations> = HorseOptionalDefaultsSchema.merge(z.object({
  ownerRec: z.lazy(() => NonMemberHorseOwnerPartialWithRelationsSchema).nullable(),
  memberOwner: z.lazy(() => MemberPartialWithRelationsSchema).nullable(),
  RiderCombo: z.lazy(() => RiderComboPartialWithRelationsSchema).array(),
}).partial())

export type HorseWithPartialRelations = z.infer<typeof HorseSchema> & HorsePartialRelations

export const HorseWithPartialRelationsSchema: z.ZodType<HorseWithPartialRelations> = HorseSchema.merge(z.object({
  ownerRec: z.lazy(() => NonMemberHorseOwnerPartialWithRelationsSchema).nullable(),
  memberOwner: z.lazy(() => MemberPartialWithRelationsSchema).nullable(),
  RiderCombo: z.lazy(() => RiderComboPartialWithRelationsSchema).array(),
}).partial())

export default HorseSchema;
