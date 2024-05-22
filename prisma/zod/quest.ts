import * as z from "zod"
import * as imports from "../null"

export const QuestModel = z.object({
  id: z.string(),
  costs: z.number().int(),
  price: z.number().int(),
})
