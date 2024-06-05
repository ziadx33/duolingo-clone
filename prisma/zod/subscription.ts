import * as z from "zod"
import * as imports from "../null"
import { CompleteUser, RelatedUserModel } from "./index"

export const SubscriptionModel = z.object({
  id: z.string(),
  name: z.string(),
  months: z.number().int(),
})

export interface CompleteSubscription extends z.infer<typeof SubscriptionModel> {
  users: CompleteUser[]
}

/**
 * RelatedSubscriptionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSubscriptionModel: z.ZodSchema<CompleteSubscription> = z.lazy(() => SubscriptionModel.extend({
  users: RelatedUserModel.array(),
}))
