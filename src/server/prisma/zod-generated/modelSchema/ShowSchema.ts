import { z } from 'zod';
import { ShowTypeSchema } from '../inputTypeSchemas/ShowTypeSchema'
import { RiderComboWithRelationsSchema, RiderComboPartialWithRelationsSchema, RiderComboOptionalDefaultsWithRelationsSchema } from './RiderComboSchema'
import type { RiderComboWithRelations, RiderComboPartialWithRelations, RiderComboOptionalDefaultsWithRelations } from './RiderComboSchema'
import { PointsWithRelationsSchema, PointsPartialWithRelationsSchema, PointsOptionalDefaultsWithRelationsSchema } from './PointsSchema'
import type { PointsWithRelations, PointsPartialWithRelations, PointsOptionalDefaultsWithRelations } from './PointsSchema'

/////////////////////////////////////////
// SHOW SCHEMA
/////////////////////////////////////////

export const ShowSchema = z.object({
  showType: ShowTypeSchema,
  uid: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  showName: z.string().trim().min(1, { message: "Show name is required" }),
  /**
   * Submitted points have yet to be review by board member
   */
  reviewed: z.boolean(),
  showDate: z.coerce.date(),
  showEndDate: z.coerce.date().nullable(),
  url: z.string().trim().url({ message: "Must be a valid URL" }).nullable(),
})

export type Show = z.infer<typeof ShowSchema>

/////////////////////////////////////////
// SHOW PARTIAL SCHEMA
/////////////////////////////////////////

export const ShowPartialSchema = ShowSchema.partial()

export type ShowPartial = z.infer<typeof ShowPartialSchema>

/////////////////////////////////////////
// SHOW OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const ShowOptionalDefaultsSchema = ShowSchema.merge(z.object({
  uid: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  /**
   * Submitted points have yet to be review by board member
   */
  reviewed: z.boolean().optional(),
}))

export type ShowOptionalDefaults = z.infer<typeof ShowOptionalDefaultsSchema>

/////////////////////////////////////////
// SHOW RELATION SCHEMA
/////////////////////////////////////////

export type ShowRelations = {
  riders: RiderComboWithRelations[];
  points: PointsWithRelations[];
};

export type ShowWithRelations = z.infer<typeof ShowSchema> & ShowRelations

export const ShowWithRelationsSchema: z.ZodType<ShowWithRelations> = ShowSchema.merge(z.object({
  riders: z.lazy(() => RiderComboWithRelationsSchema).array(),
  points: z.lazy(() => PointsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// SHOW OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type ShowOptionalDefaultsRelations = {
  riders: RiderComboOptionalDefaultsWithRelations[];
  points: PointsOptionalDefaultsWithRelations[];
};

export type ShowOptionalDefaultsWithRelations = z.infer<typeof ShowOptionalDefaultsSchema> & ShowOptionalDefaultsRelations

export const ShowOptionalDefaultsWithRelationsSchema: z.ZodType<ShowOptionalDefaultsWithRelations> = ShowOptionalDefaultsSchema.merge(z.object({
  riders: z.lazy(() => RiderComboOptionalDefaultsWithRelationsSchema).array(),
  points: z.lazy(() => PointsOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// SHOW PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type ShowPartialRelations = {
  riders?: RiderComboPartialWithRelations[];
  points?: PointsPartialWithRelations[];
};

export type ShowPartialWithRelations = z.infer<typeof ShowPartialSchema> & ShowPartialRelations

export const ShowPartialWithRelationsSchema: z.ZodType<ShowPartialWithRelations> = ShowPartialSchema.merge(z.object({
  riders: z.lazy(() => RiderComboPartialWithRelationsSchema).array(),
  points: z.lazy(() => PointsPartialWithRelationsSchema).array(),
})).partial()

export type ShowOptionalDefaultsWithPartialRelations = z.infer<typeof ShowOptionalDefaultsSchema> & ShowPartialRelations

export const ShowOptionalDefaultsWithPartialRelationsSchema: z.ZodType<ShowOptionalDefaultsWithPartialRelations> = ShowOptionalDefaultsSchema.merge(z.object({
  riders: z.lazy(() => RiderComboPartialWithRelationsSchema).array(),
  points: z.lazy(() => PointsPartialWithRelationsSchema).array(),
}).partial())

export type ShowWithPartialRelations = z.infer<typeof ShowSchema> & ShowPartialRelations

export const ShowWithPartialRelationsSchema: z.ZodType<ShowWithPartialRelations> = ShowSchema.merge(z.object({
  riders: z.lazy(() => RiderComboPartialWithRelationsSchema).array(),
  points: z.lazy(() => PointsPartialWithRelationsSchema).array(),
}).partial())

export default ShowSchema;
