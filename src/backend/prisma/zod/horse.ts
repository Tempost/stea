import * as z from 'zod';
import { Status } from '@prisma/client';
import {
  CompleteNonMemberHorseOwner,
  RelatedNonMemberHorseOwnerModel,
  CompleteRiderCombo,
  RelatedRiderComboModel,
} from './index';

export const HorseModel = z.object({
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  horseRN: z.string(),
  horseAKA: z.string().nullish(),
  notConnected: z.boolean(),
  registrationDate: z.date().nullish(),
  regType: z.nativeEnum(Status),
  owner: z.string().nullish(),
});

export interface CompleteHorse extends z.infer<typeof HorseModel> {
  member?: CompleteNonMemberHorseOwner | null;
  RiderCombo: CompleteRiderCombo[];
}

/**
 * RelatedHorseModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedHorseModel: z.ZodSchema<CompleteHorse> = z.lazy(() =>
  HorseModel.extend({
    member: RelatedNonMemberHorseOwnerModel.nullish(),
    RiderCombo: RelatedRiderComboModel.array(),
  })
);
