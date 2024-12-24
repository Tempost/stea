import { z } from 'zod';
import { DivisionSchema } from '../inputTypeSchemas/DivisionSchema'
import { MemberWithRelationsSchema, MemberPartialWithRelationsSchema, MemberOptionalDefaultsWithRelationsSchema } from './MemberSchema'
import type { MemberWithRelations, MemberPartialWithRelations, MemberOptionalDefaultsWithRelations } from './MemberSchema'
import { HorseWithRelationsSchema, HorsePartialWithRelationsSchema, HorseOptionalDefaultsWithRelationsSchema } from './HorseSchema'
import type { HorseWithRelations, HorsePartialWithRelations, HorseOptionalDefaultsWithRelations } from './HorseSchema'
import { PointsWithRelationsSchema, PointsPartialWithRelationsSchema, PointsOptionalDefaultsWithRelationsSchema } from './PointsSchema'
import type { PointsWithRelations, PointsPartialWithRelations, PointsOptionalDefaultsWithRelations } from './PointsSchema'
import { ShowWithRelationsSchema, ShowPartialWithRelationsSchema, ShowOptionalDefaultsWithRelationsSchema } from './ShowSchema'
import type { ShowWithRelations, ShowPartialWithRelations, ShowOptionalDefaultsWithRelations } from './ShowSchema'

/////////////////////////////////////////
// RIDER COMBO SCHEMA
/////////////////////////////////////////

export const RiderComboSchema = z.object({
  division: DivisionSchema,
  uid: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  totalPoints: z.number(),
  totalShows: z.number().int(),
  completedHT: z.boolean(),
  multiVenue: z.boolean(),
  memberName: z.string().trim().min(1, { message: "Member Name is required" }),
  horseName: z.string().trim().min(1, { message: "Horse Name is required" }),
  showYear: z.number().int().nullable(),
})

export type RiderCombo = z.infer<typeof RiderComboSchema>

/////////////////////////////////////////
// RIDER COMBO PARTIAL SCHEMA
/////////////////////////////////////////

export const RiderComboPartialSchema = RiderComboSchema.partial()

export type RiderComboPartial = z.infer<typeof RiderComboPartialSchema>

/////////////////////////////////////////
// RIDER COMBO OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const RiderComboOptionalDefaultsSchema = RiderComboSchema.merge(z.object({
  uid: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  totalPoints: z.number().optional(),
  totalShows: z.number().int().optional(),
  completedHT: z.boolean().optional(),
  multiVenue: z.boolean().optional(),
}))

export type RiderComboOptionalDefaults = z.infer<typeof RiderComboOptionalDefaultsSchema>

/////////////////////////////////////////
// RIDER COMBO RELATION SCHEMA
/////////////////////////////////////////

export type RiderComboRelations = {
  member: MemberWithRelations;
  horse: HorseWithRelations;
  points: PointsWithRelations[];
  shows: ShowWithRelations[];
};

export type RiderComboWithRelations = z.infer<typeof RiderComboSchema> & RiderComboRelations

export const RiderComboWithRelationsSchema: z.ZodType<RiderComboWithRelations> = RiderComboSchema.merge(z.object({
  member: z.lazy(() => MemberWithRelationsSchema),
  horse: z.lazy(() => HorseWithRelationsSchema),
  points: z.lazy(() => PointsWithRelationsSchema).array(),
  shows: z.lazy(() => ShowWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// RIDER COMBO OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type RiderComboOptionalDefaultsRelations = {
  member: MemberOptionalDefaultsWithRelations;
  horse: HorseOptionalDefaultsWithRelations;
  points: PointsOptionalDefaultsWithRelations[];
  shows: ShowOptionalDefaultsWithRelations[];
};

export type RiderComboOptionalDefaultsWithRelations = z.infer<typeof RiderComboOptionalDefaultsSchema> & RiderComboOptionalDefaultsRelations

export const RiderComboOptionalDefaultsWithRelationsSchema: z.ZodType<RiderComboOptionalDefaultsWithRelations> = RiderComboOptionalDefaultsSchema.merge(z.object({
  member: z.lazy(() => MemberOptionalDefaultsWithRelationsSchema),
  horse: z.lazy(() => HorseOptionalDefaultsWithRelationsSchema),
  points: z.lazy(() => PointsOptionalDefaultsWithRelationsSchema).array(),
  shows: z.lazy(() => ShowOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// RIDER COMBO PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type RiderComboPartialRelations = {
  member?: MemberPartialWithRelations;
  horse?: HorsePartialWithRelations;
  points?: PointsPartialWithRelations[];
  shows?: ShowPartialWithRelations[];
};

export type RiderComboPartialWithRelations = z.infer<typeof RiderComboPartialSchema> & RiderComboPartialRelations

export const RiderComboPartialWithRelationsSchema: z.ZodType<RiderComboPartialWithRelations> = RiderComboPartialSchema.merge(z.object({
  member: z.lazy(() => MemberPartialWithRelationsSchema),
  horse: z.lazy(() => HorsePartialWithRelationsSchema),
  points: z.lazy(() => PointsPartialWithRelationsSchema).array(),
  shows: z.lazy(() => ShowPartialWithRelationsSchema).array(),
})).partial()

export type RiderComboOptionalDefaultsWithPartialRelations = z.infer<typeof RiderComboOptionalDefaultsSchema> & RiderComboPartialRelations

export const RiderComboOptionalDefaultsWithPartialRelationsSchema: z.ZodType<RiderComboOptionalDefaultsWithPartialRelations> = RiderComboOptionalDefaultsSchema.merge(z.object({
  member: z.lazy(() => MemberPartialWithRelationsSchema),
  horse: z.lazy(() => HorsePartialWithRelationsSchema),
  points: z.lazy(() => PointsPartialWithRelationsSchema).array(),
  shows: z.lazy(() => ShowPartialWithRelationsSchema).array(),
}).partial())

export type RiderComboWithPartialRelations = z.infer<typeof RiderComboSchema> & RiderComboPartialRelations

export const RiderComboWithPartialRelationsSchema: z.ZodType<RiderComboWithPartialRelations> = RiderComboSchema.merge(z.object({
  member: z.lazy(() => MemberPartialWithRelationsSchema),
  horse: z.lazy(() => HorsePartialWithRelationsSchema),
  points: z.lazy(() => PointsPartialWithRelationsSchema).array(),
  shows: z.lazy(() => ShowPartialWithRelationsSchema).array(),
}).partial())

export default RiderComboSchema;
