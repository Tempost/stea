import { z } from 'zod';
import { type RiderComboWithRelations, RiderComboWithRelationsSchema } from './RiderComboSchema'
import { type ShowWithRelations, ShowWithRelationsSchema } from './ShowSchema'
import { type RiderComboPartialWithRelations, RiderComboPartialWithRelationsSchema } from './RiderComboSchema'
import { type ShowPartialWithRelations, ShowPartialWithRelationsSchema } from './ShowSchema'

/////////////////////////////////////////
// POINTS SCHEMA
/////////////////////////////////////////

export const PointsSchema = z.object({
  uid: z.string().cuid(),
  riderUid: z.string().trim().min(1, { message: "Member Name is required" }),
  points: z.number(),
  place: z.string().trim(),
  showUid: z.string(),
})

export type Points = z.infer<typeof PointsSchema>

// POINTS PARTIAL SCHEMA
//------------------------------------------------------

export const PointsPartialSchema = PointsSchema.partial()

export type PointsPartial = z.infer<typeof PointsPartialSchema>

// POINTS OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const PointsOptionalDefaultsSchema = PointsSchema.merge(z.object({
  uid: z.string().cuid().optional(),
}))

export type PointsOptionalDefaults = z.infer<typeof PointsOptionalDefaultsSchema>

// POINTS RELATION SCHEMA
//------------------------------------------------------

export type PointsRelations = {
  RiderCombo: RiderComboWithRelations;
  show: ShowWithRelations;
};

export type PointsWithRelations = z.infer<typeof PointsSchema> & PointsRelations

export const PointsWithRelationsSchema: z.ZodType<PointsWithRelations> = PointsSchema.merge(z.object({
  RiderCombo: z.lazy(() => RiderComboWithRelationsSchema),
  show: z.lazy(() => ShowWithRelationsSchema),
}))

// POINTS OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type PointsOptionalDefaultsWithRelations = z.infer<typeof PointsOptionalDefaultsSchema> & PointsRelations

export const PointsOptionalDefaultsWithRelationsSchema: z.ZodType<PointsOptionalDefaultsWithRelations> = PointsOptionalDefaultsSchema.merge(z.object({
  RiderCombo: z.lazy(() => RiderComboWithRelationsSchema),
  show: z.lazy(() => ShowWithRelationsSchema),
}))

// POINTS PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type PointsPartialRelations = {
  RiderCombo?: RiderComboPartialWithRelations;
  show?: ShowPartialWithRelations;
};

export type PointsPartialWithRelations = z.infer<typeof PointsPartialSchema> & PointsPartialRelations

export const PointsPartialWithRelationsSchema: z.ZodType<PointsPartialWithRelations> = PointsPartialSchema.merge(z.object({
  RiderCombo: z.lazy(() => RiderComboPartialWithRelationsSchema),
  show: z.lazy(() => ShowPartialWithRelationsSchema),
})).partial()

export default PointsSchema;
