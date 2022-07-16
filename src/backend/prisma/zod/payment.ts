import * as z from "zod"
import { PaymentMethod } from "@prisma/client"
import { CompleteMember, RelatedMemberModel } from "./index"

export const PaymentModel = z.object({
  updatedAt: z.date().nullish(),
  amountPaid: z.number().int().nullish(),
  datePaid: z.date().nullish(),
  paymentMethod: z.nativeEnum(PaymentMethod).nullish(),
  checkNumber: z.number().int().nullish(),
  comments: z.string().nullish(),
  payee: z.string(),
})

export interface CompletePayment extends z.infer<typeof PaymentModel> {
  member: CompleteMember
}

/**
 * RelatedPaymentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPaymentModel: z.ZodSchema<CompletePayment> = z.lazy(() => PaymentModel.extend({
  member: RelatedMemberModel,
}))
