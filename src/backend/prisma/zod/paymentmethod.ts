import * as z from "zod"
import * as imports from "../null"

export const PaymentMethodModel = z.object({
  uid: z.string(),
  amountPaid: z.number().int(),
  datePaid: z.date(),
  paymentMethod: z.string(),
  checkNumber: z.number().int(),
  comments: z.string(),
})
