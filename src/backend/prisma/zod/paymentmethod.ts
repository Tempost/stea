import * as z from 'zod';
import { CompleteMember, RelatedMemberModel } from './index';

export const PaymentMethodModel = z.object({
  uid: z.string(),
  amountPaid: z.number().int(),
  datePaid: z.date(),
  paymentMethod: z.string(),
  checkNumber: z.number().int().nullish(),
  comments: z.string(),
});

export interface CompletePaymentMethod
  extends z.infer<typeof PaymentMethodModel> {
  Member?: CompleteMember | null;
}

/**
 * RelatedPaymentMethodModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPaymentMethodModel: z.ZodSchema<CompletePaymentMethod> =
  z.lazy(() =>
    PaymentMethodModel.extend({
      Member: RelatedMemberModel.nullish(),
    })
  );
